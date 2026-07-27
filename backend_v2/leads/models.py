from django.db import models
from django.utils import timezone
from leads.services.reference_service import make_reference


class Lead(models.Model):
    """Lead model representing a quote request form submission."""
    reference = models.CharField(
        max_length=50,
        unique=True,
        editable=False,
        help_text="Unique auto-generated reference code (RT/Q/YYYYMMDD/6HEX)"
    )
    service_slug = models.CharField(max_length=255)
    service_name = models.CharField(max_length=255, null=True, blank=True)
    business_stage = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    turnover = models.CharField(max_length=255, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    notes = models.TextField(null=True, blank=True)
    source = models.CharField(max_length=100, default="quote_form")
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def save(self, *args, **kwargs):
        if not self.reference:
            # Generate reference and ensure it doesn't collide
            while True:
                ref = make_reference("Q")
                if not Lead.objects.filter(reference=ref).exists():
                    self.reference = ref
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference} - {self.full_name} ({self.service_slug})"


class ContactMessage(models.Model):
    """ContactMessage model representing a contact form submission."""
    reference = models.CharField(
        max_length=50,
        unique=True,
        editable=False,
        help_text="Unique auto-generated reference code (RT/C/YYYYMMDD/6HEX)"
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50, null=True, blank=True)
    subject = models.CharField(max_length=255, null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def save(self, *args, **kwargs):
        if not self.reference:
            # Generate reference and ensure it doesn't collide
            while True:
                ref = make_reference("C")
                if not ContactMessage.objects.filter(reference=ref).exists():
                    self.reference = ref
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference} - {self.full_name}"


class Newsletter(models.Model):
    """Newsletter subscription model."""
    email = models.EmailField(max_length=255, unique=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.email


class JobApplication(models.Model):
    """JobApplication model representing a job application submission."""
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=50)
    position = models.CharField(max_length=255)
    resume_url = models.URLField(max_length=500)
    portfolio = models.URLField(max_length=500, null=True, blank=True)
    linkedin = models.URLField(max_length=500, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.name} - {self.position}"


class JobOpening(models.Model):
    """HR-managed job opening shown on the public Careers page."""
    TYPE_CHOICES = [
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Internship", "Internship"),
    ]

    title       = models.CharField(max_length=200)
    department  = models.CharField(max_length=100)
    location    = models.CharField(max_length=100)
    type        = models.CharField(max_length=20, choices=TYPE_CHOICES, default="Full-time")
    description = models.TextField(max_length=5000)   # stored as plain text only
    is_active   = models.BooleanField(default=True)   # soft-delete — never hard-delete
    created_by  = models.ForeignKey(
        "auth.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="job_openings",
    )
    created_at  = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.title} ({self.department})"


class LoginAttempt(models.Model):
    """DB-backed log of every login attempt. Used for rate limiting across all workers."""
    ip_address   = models.GenericIPAddressField()
    username     = models.CharField(max_length=150)
    success      = models.BooleanField()
    attempted_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        indexes = [
            models.Index(fields=["ip_address", "attempted_at"]),
        ]

    def __str__(self):
        status = "OK" if self.success else "FAIL"
        return f"{self.ip_address} [{status}] {self.attempted_at}"


class HRAuditLog(models.Model):
    """Immutable audit trail for every HR action."""
    ACTION_CHOICES = [
        ("LOGIN",           "Login"),
        ("LOGIN_FAIL",      "Login Failure"),
        ("LOGOUT",          "Logout"),
        ("JOB_CREATE",      "Job Created"),
        ("JOB_DEACTIVATE",  "Job Deactivated"),
    ]

    actor      = models.ForeignKey(
        "auth.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="audit_logs",
    )
    action     = models.CharField(max_length=20, choices=ACTION_CHOICES)
    target_id  = models.IntegerField(null=True, blank=True)   # JobOpening.id for job mutations
    detail     = models.CharField(max_length=500, blank=True) # e.g. job title
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp  = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.actor} | {self.action} | {self.timestamp}"
