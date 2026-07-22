from rest_framework import serializers
from .models import Lead, ContactMessage, Newsletter, JobApplication
from .validators import validate_email_format, validate_phone_format


class LeadSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email_format])
    phone = serializers.CharField(validators=[validate_phone_format])
    
    class Meta:
        model = Lead
        # Explicitly matching the FastAPI payload and returning all fields
        fields = [
            "id", "reference", "service_slug", "service_name", "business_stage", 
            "state", "turnover", "full_name", "email", "phone", "notes", 
            "source", "created_at"
        ]
        read_only_fields = ["id", "reference", "created_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email_format])
    phone = serializers.CharField(validators=[validate_phone_format], required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = ContactMessage
        fields = [
            "id", "reference", "full_name", "email", "phone", "subject", 
            "message", "created_at"
        ]
        read_only_fields = ["id", "reference", "created_at"]


class NewsletterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email_format])

    class Meta:
        model = Newsletter
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]


class JobApplicationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email_format])
    phone = serializers.CharField(validators=[validate_phone_format])
    # For now, resume_url is a plain string. Step 4 will change this.
    resume_url = serializers.URLField(max_length=500)

    class Meta:
        model = JobApplication
        fields = [
            "id", "name", "email", "phone", "position", "resume_url",
            "portfolio", "linkedin", "message", "created_at"
        ]
        read_only_fields = ["id", "created_at"]
