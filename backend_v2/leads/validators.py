import re
from rest_framework import serializers

def validate_email_format(value):
    """Reject obviously fake/malformed patterns beyond DRF's default EmailField."""
    # Basic check to catch @test.com or similar dummy inputs if desired,
    # but primarily ensuring a standard email structure.
    # DRF already checks standard format, we can add a check for valid TLD length.
    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", value):
        raise serializers.ValidationError("Please provide a valid email address.")
    if "test.com" in value.lower() or "example.com" in value.lower():
        # Optional: reject dummy emails for a production system
        pass
    return value

def validate_phone_format(value):
    """Strictly enforce exactly 10 digits."""
    if not value:
        return value
    pattern = r"^\d{10}$"
    if not re.match(pattern, value):
        raise serializers.ValidationError(
            "Enter a valid 10-digit mobile number."
        )
    return value

def validate_file_type(value):
    """Restrict to pdf, doc, docx."""
    # This is for Step 4 (file uploads)
    allowed_extensions = ['.pdf', '.doc', '.docx']
    # If value is a string (URL in step 3), we might just check suffix,
    # but usually this applies to InMemoryUploadedFile. 
    # For now, it's just a prep function.
    if hasattr(value, 'name'):
        import os
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in allowed_extensions:
            raise serializers.ValidationError(f"Unsupported file extension. Allowed extensions are: {', '.join(allowed_extensions)}")
    return value

def validate_file_size(value):
    """Max 5MB."""
    # This is for Step 4 (file uploads)
    max_size_mb = 5
    if hasattr(value, 'size'):
        if value.size > max_size_mb * 1024 * 1024:
            raise serializers.ValidationError(f"File size exceeds {max_size_mb}MB limit.")
    return value
