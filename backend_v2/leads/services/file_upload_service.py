import cloudinary
import cloudinary.uploader
from rest_framework.exceptions import ValidationError
from leads.validators import validate_file_type, validate_file_size

def upload_resume(file_obj):
    """
    Validates a file object (size and type) and uploads it to Cloudinary.
    Returns the secure URL on success, or raises a ValidationError.
    """
    if not file_obj:
        raise ValidationError("No file was provided.")

    # 1. Run size and type validations
    try:
        validate_file_size(file_obj)
        validate_file_type(file_obj)
    except Exception as e:
        # Re-raise standard exception as DRF ValidationError to ensure a clean 400 response
        raise ValidationError(str(e))

    # 2. Upload to Cloudinary
    try:
        # By passing the file object directly, cloudinary handles the buffer
        # We place it in a specific folder 'resumes' for neatness
        upload_result = cloudinary.uploader.upload(
            file_obj,
            folder="resumes",
            resource_type="raw" # Treat non-image docs as raw files
        )
        return upload_result.get("secure_url")
    except Exception as e:
        raise ValidationError(f"Failed to upload to Cloudinary: {str(e)}")
