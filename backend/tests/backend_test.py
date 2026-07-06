"""Backend API tests for RightTeam."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8000').rstrip('/')
API = f"{BASE_URL}/api"

REF_Q_RE = re.compile(r"^RT/Q/\d{8}/[A-Z0-9]{6}$")
REF_C_RE = re.compile(r"^RT/C/\d{8}/[A-Z0-9]{6}$")


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_health(session):
    r = session.get(f"{API}/health", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# ---------- Leads ----------
def test_create_lead_and_list(session):
    payload = {
        "service_slug": "gst-registration",
        "service_name": "GST Registration",
        "business_stage": "new",
        "state": "Karnataka",
        "turnover": "0-20L",
        "full_name": "TEST_QuoteUser",
        "email": "test_quote@example.com",
        "phone": "9876543210",
        "notes": "test lead"
    }
    r = session.post(f"{API}/leads", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "reference" in data
    assert REF_Q_RE.match(data["reference"]), f"bad ref: {data['reference']}"
    assert data["email"] == payload["email"]
    assert data["service_slug"] == payload["service_slug"]
    ref = data["reference"]

    # List and verify persistence
    r2 = session.get(f"{API}/leads", timeout=30)
    assert r2.status_code == 200
    leads = r2.json()
    assert isinstance(leads, list)
    assert any(l.get("reference") == ref for l in leads), "Created lead not in list"


def test_create_lead_invalid_email(session):
    payload = {
        "service_slug": "gst-registration",
        "full_name": "Bad Email",
        "email": "not-an-email",
        "phone": "9876543210",
    }
    r = session.post(f"{API}/leads", json=payload, timeout=30)
    assert r.status_code == 422


# ---------- Contact ----------
def test_create_contact(session):
    payload = {
        "full_name": "TEST_ContactUser",
        "email": "test_contact@example.com",
        "phone": "9876543210",
        "subject": "Test subject",
        "message": "Hello test message"
    }
    r = session.post(f"{API}/contact", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert REF_C_RE.match(data["reference"]), f"bad ref: {data['reference']}"
    assert data["email"] == payload["email"]
