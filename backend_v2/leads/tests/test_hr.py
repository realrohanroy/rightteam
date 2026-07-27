"""
Tests for the HR portal auth and CRUD flows.
Run with: python manage.py test leads.tests.test_hr
"""
import datetime
from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APIClient
from unittest.mock import patch

from leads.models import JobOpening, LoginAttempt, HRAuditLog
from leads.hr_auth import issue_token, verify_token
import jwt


def make_staff_user(username="rightteam@hr", password="rightteam101"):
    user = User.objects.create_user(username=username, password=password)
    user.is_staff = True
    user.save()
    return user


class HRLoginTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = make_staff_user()
        self.url = "/api/hr/login"

    def test_login_correct_credentials_returns_token(self):
        res = self.client.post(self.url, {"username": "rightteam@hr", "password": "rightteam101"}, format="json")
        self.assertEqual(res.status_code, 200)
        self.assertIn("token", res.data)
        self.assertEqual(res.data["username"], "rightteam@hr")

    def test_login_wrong_password_returns_401(self):
        res = self.client.post(self.url, {"username": "rightteam@hr", "password": "wrong"}, format="json")
        self.assertEqual(res.status_code, 401)
        self.assertNotIn("token", res.data)

    def test_login_wrong_username_returns_401_same_message(self):
        res = self.client.post(self.url, {"username": "nobody", "password": "whatever"}, format="json")
        self.assertEqual(res.status_code, 401)
        # Same message regardless — prevents username enumeration
        self.assertEqual(res.data["error"], "Invalid credentials.")

    def test_rate_limit_after_5_failures(self):
        for _ in range(5):
            LoginAttempt.objects.create(
                ip_address="127.0.0.1",
                username="rightteam@hr",
                success=False,
            )
        res = self.client.post(self.url, {"username": "rightteam@hr", "password": "wrong"}, format="json")
        self.assertEqual(res.status_code, 429)

    def test_rate_limit_resets_after_window(self):
        # 5 old failures outside the 60-second window → should not block
        old_time = timezone.now() - datetime.timedelta(seconds=90)
        for _ in range(5):
            attempt = LoginAttempt.objects.create(
                ip_address="127.0.0.1",
                username="rightteam@hr",
                success=False,
            )
            # Manually backdate
            LoginAttempt.objects.filter(pk=attempt.pk).update(attempted_at=old_time)

        res = self.client.post(self.url, {"username": "rightteam@hr", "password": "rightteam101"}, format="json")
        self.assertEqual(res.status_code, 200)

    def test_audit_log_created_on_success(self):
        self.client.post(self.url, {"username": "rightteam@hr", "password": "rightteam101"}, format="json")
        self.assertTrue(HRAuditLog.objects.filter(action="LOGIN", actor=self.user).exists())

    def test_audit_log_created_on_failure(self):
        self.client.post(self.url, {"username": "rightteam@hr", "password": "wrong"}, format="json")
        self.assertTrue(HRAuditLog.objects.filter(action="LOGIN_FAIL").exists())


class HRTokenTests(TestCase):

    def setUp(self):
        self.user = make_staff_user()

    def test_valid_token_accepted(self):
        token = issue_token(self.user.id, self.user.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        res = client.get("/api/hr/jobs/all")
        self.assertEqual(res.status_code, 200)

    def test_expired_token_rejected(self):
        # Issue a token that already expired
        now = datetime.datetime.utcnow()
        payload = {
            "sub": self.user.id,
            "username": self.user.username,
            "iat": int((now - datetime.timedelta(hours=9)).timestamp()),
            "exp": int((now - datetime.timedelta(hours=1)).timestamp()),
        }
        from django.conf import settings
        token = jwt.encode(payload, settings.HR_JWT_SECRET, algorithm="HS256")
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        res = client.get("/api/hr/jobs/all")
        self.assertEqual(res.status_code, 401)

    def test_token_before_generation_rejected(self):
        # Issue a token with iat before HR_TOKEN_GENERATION
        from django.conf import settings
        now = datetime.datetime.utcnow()
        payload = {
            "sub": self.user.id,
            "username": self.user.username,
            "iat": int((now - datetime.timedelta(days=1)).timestamp()),
            "exp": int((now + datetime.timedelta(hours=8)).timestamp()),
        }
        token = jwt.encode(payload, settings.HR_JWT_SECRET, algorithm="HS256")
        with self.assertRaises(Exception):
            verify_token(token)

    def test_non_staff_user_rejected(self):
        regular = User.objects.create_user(username="regular", password="pass")
        token = issue_token(regular.id, regular.username)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        res = client.get("/api/hr/jobs/all")
        self.assertEqual(res.status_code, 401)

    def test_missing_token_rejected(self):
        client = APIClient()
        res = client.get("/api/hr/jobs/all")
        self.assertEqual(res.status_code, 401)


class HRJobTests(TestCase):

    def setUp(self):
        self.user = make_staff_user()
        token = issue_token(self.user.id, self.user.username)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def _create_job(self, **overrides):
        data = {
            "title": "Tax Analyst",
            "department": "Compliance",
            "location": "Mumbai",
            "type": "Full-time",
            "description": "Great role.",
            **overrides,
        }
        return self.client.post("/api/hr/jobs/create", data, format="json")

    def test_create_job_success(self):
        res = self._create_job()
        self.assertEqual(res.status_code, 201)
        self.assertEqual(JobOpening.objects.count(), 1)

    def test_create_job_html_in_description_is_escaped(self):
        self._create_job(description="<script>alert(1)</script>")
        job = JobOpening.objects.first()
        self.assertNotIn("<script>", job.description)
        self.assertIn("&lt;script&gt;", job.description)

    def test_create_job_invalid_type_rejected(self):
        res = self._create_job(type="Executive")
        self.assertEqual(res.status_code, 400)
        self.assertIn("type", res.data)

    def test_seed_initial_jobs_when_empty(self):
        self.assertEqual(JobOpening.objects.count(), 0)
        pub_client = APIClient()
        res = pub_client.get("/api/hr/jobs")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)
        self.assertEqual(JobOpening.objects.count(), 3)
        titles = [j["title"] for j in res.data]
        self.assertIn("Business Development Executive", titles)
        self.assertIn("Business Development Manager", titles)
        self.assertIn("Team Leader – Sales", titles)

    def test_public_endpoint_returns_active_only(self):
        JobOpening.objects.create(
            title="Active", department="D", location="L", type="Full-time",
            description="A", created_by=self.user
        )
        JobOpening.objects.create(
            title="Inactive", department="D", location="L", type="Full-time",
            description="B", created_by=self.user, is_active=False
        )
        pub_client = APIClient()
        res = pub_client.get("/api/hr/jobs")
        self.assertEqual(res.status_code, 200)
        titles = [j["title"] for j in res.data]
        self.assertIn("Active", titles)
        self.assertNotIn("Inactive", titles)

    def test_admin_endpoint_returns_all(self):
        JobOpening.objects.create(
            title="Active", department="D", location="L", type="Full-time",
            description="A", created_by=self.user
        )
        JobOpening.objects.create(
            title="Inactive", department="D", location="L", type="Full-time",
            description="B", created_by=self.user, is_active=False
        )
        res = self.client.get("/api/hr/jobs/all")
        self.assertEqual(len(res.data), 2)

    def test_deactivate_soft_deletes(self):
        job = JobOpening.objects.create(
            title="Role", department="D", location="L", type="Full-time",
            description="X", created_by=self.user
        )
        res = self.client.delete(f"/api/hr/jobs/{job.pk}/delete")
        self.assertEqual(res.status_code, 200)
        job.refresh_from_db()
        self.assertFalse(job.is_active)       # still in DB
        self.assertEqual(JobOpening.objects.count(), 1)  # row not deleted

    def test_deactivate_nonexistent_job_returns_404(self):
        res = self.client.delete("/api/hr/jobs/9999/delete")
        self.assertEqual(res.status_code, 404)

    def test_deactivate_creates_audit_log(self):
        job = JobOpening.objects.create(
            title="Role", department="D", location="L", type="Full-time",
            description="X", created_by=self.user
        )
        self.client.delete(f"/api/hr/jobs/{job.pk}/delete")
        self.assertTrue(HRAuditLog.objects.filter(action="JOB_DEACTIVATE", target_id=job.pk).exists())
