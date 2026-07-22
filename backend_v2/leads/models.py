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
