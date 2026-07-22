from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lead, ContactMessage, Newsletter, JobApplication
from .serializers import (
    LeadSerializer,
    ContactMessageSerializer,
    NewsletterSerializer,
    JobApplicationSerializer,
)
from .services.file_upload_service import upload_resume
from .services.email_service import send_internal_notification, send_acknowledgement
from django.conf import settings


@api_view(["GET", "POST"])
def leads_api(request):
    if request.method == "POST":
        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # Send emails (skip compliance tools to keep them silent like newsletter)
            slug = serializer.validated_data.get("service_slug", "")
            if slug not in ["compliance-reminders", "compliance-calendar-2026"]:
                sales_email = getattr(settings, 'SALES_EMAIL', 'sales@rightteam.in')
                send_internal_notification(sales_email, f"New Lead: {slug}", serializer.data)
                
                user_email = serializer.validated_data.get("email")
                if user_email:
                    send_acknowledgement(user_email, "lead_ack", serializer.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        try:
            limit = int(request.query_params.get("limit", 100))
        except ValueError:
            limit = 100
        
        leads = Lead.objects.all().order_by("-created_at")[:limit]
        serializer = LeadSerializer(leads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def contact_api(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        sales_email = getattr(settings, 'SALES_EMAIL', 'sales@rightteam.in')
        send_internal_notification(sales_email, "New Contact Message", serializer.data)
        
        user_email = serializer.validated_data.get("email")
        if user_email:
            send_acknowledgement(user_email, "contact_ack", serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def newsletter_api(request):
    email = request.data.get("email")
    if email and Newsletter.objects.filter(email=email).exists():
        # Match requirement: return 200 with friendly message if already subscribed
        return Response(
            {"message": "already subscribed", "email": email}, 
            status=status.HTTP_200_OK
        )
    
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .services.file_upload_service import upload_resume

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def career_api(request):
    # Convert QueryDict to a standard mutable dict to avoid deepcopying file streams
    data = request.data.dict()
    
    resume_file = request.FILES.get("resume")
    if not resume_file:
        return Response(
            {"resume": ["Please upload a resume file."]}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # This will raise a DRF ValidationError automatically if size/type is invalid
    # or if the Cloudinary upload fails.
    secure_url = upload_resume(resume_file)
    data["resume_url"] = secure_url

    serializer = JobApplicationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
