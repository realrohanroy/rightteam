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


# ── HR Portal Views ────────────────────────────────────────────────────────────

import html
import datetime
from django.contrib.auth import authenticate
from django.utils import timezone as tz
from .hr_auth import issue_token, get_client_ip, require_hr_token
from .models import JobOpening, LoginAttempt, HRAuditLog

RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_MAX_FAILURES   = 5
PRUNE_OLDER_THAN_HOURS    = 24


def _prune_old_attempts():
    """Remove LoginAttempt rows older than 24h to prevent table bloat."""
    cutoff = tz.now() - datetime.timedelta(hours=PRUNE_OLDER_THAN_HOURS)
    LoginAttempt.objects.filter(attempted_at__lt=cutoff).delete()


def _is_rate_limited(ip: str) -> bool:
    window_start = tz.now() - datetime.timedelta(seconds=RATE_LIMIT_WINDOW_SECONDS)
    fail_count = LoginAttempt.objects.filter(
        ip_address=ip,
        success=False,
        attempted_at__gte=window_start,
    ).count()
    return fail_count >= RATE_LIMIT_MAX_FAILURES


@api_view(["POST"])
def hr_login(request):
    _prune_old_attempts()
    ip = get_client_ip(request)

    if _is_rate_limited(ip):
        return Response(
            {"error": "Too many failed attempts. Please wait 60 seconds."},
            status=status.HTTP_429_TOO_MANY_REQUESTS,
            headers={"Retry-After": "60"},
        )

    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    # authenticate() handles password hashing safely
    user = authenticate(request, username=username, password=password)

    if user is None or not user.is_staff or not user.is_active:
        LoginAttempt.objects.create(ip_address=ip, username=username, success=False)
        HRAuditLog.objects.create(action="LOGIN_FAIL", ip_address=ip, detail=username)
        return Response(
            {"error": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    LoginAttempt.objects.create(ip_address=ip, username=username, success=True)
    HRAuditLog.objects.create(actor=user, action="LOGIN", ip_address=ip)
    token = issue_token(user.id, user.username)
    return Response({"token": token, "username": user.username}, status=status.HTTP_200_OK)


@api_view(["POST"])
@require_hr_token
def hr_logout(request):
    HRAuditLog.objects.create(
        actor=request.hr_user,
        action="LOGOUT",
        ip_address=get_client_ip(request),
    )
    return Response({"status": "logged out"}, status=status.HTTP_200_OK)


def seed_initial_jobs():
    """Seeds the 3 initial RightTeam job postings if the table is empty."""
    if JobOpening.objects.count() > 0:
        return
    initial_jobs = [
        {
            "title": "Business Development Executive",
            "department": "Business Development",
            "location": "Ahmedabad",
            "type": "Full-time",
            "experience": "0–2 Years",
            "description": "We are looking for a motivated individual to identify new business opportunities, build strong client relationships and contribute to the growth of our services.",
            "responsibilities": "Identify and pursue new business opportunities\nBuild and maintain client relationships\nAchieve sales & business development targets",
            "icon_name": "bde",
        },
        {
            "title": "Business Development Manager",
            "department": "Business Development",
            "location": "Ahmedabad",
            "type": "Full-time",
            "experience": "2–3 Years",
            "description": "We are looking for a dynamic professional to lead business development initiatives, drive client acquisition and achieve growth targets.",
            "responsibilities": "Develop and execute business strategies\nLead client meetings and negotiations\nDrive revenue growth and team performance",
            "icon_name": "bdm",
        },
        {
            "title": "Team Leader – Sales",
            "department": "Sales & Management",
            "location": "Ahmedabad",
            "type": "Full-time",
            "experience": "3–5 Years",
            "description": "We are looking for an experienced leader to manage the sales team, ensure target achievement and drive overall performance.",
            "responsibilities": "Lead, motivate and manage the sales team\nMonitor performance and provide feedback\nEnsure targets are met and exceeded",
            "icon_name": "tls",
        },
    ]
    for data in initial_jobs:
        JobOpening.objects.create(**data)


@api_view(["GET"])
def hr_jobs_public(request):
    """Public endpoint: active jobs only. Used by the CareerPage."""
    seed_initial_jobs()
    jobs_data = []
    for j in JobOpening.objects.filter(is_active=True).order_by("id"):
        jobs_data.append({
            "id": j.id,
            "title": j.title,
            "department": j.department,
            "location": j.location,
            "type": j.type,
            "experience": j.experience,
            "description": j.description,
            "responsibilities": [r.strip() for r in j.responsibilities.splitlines() if r.strip()],
            "icon_name": j.icon_name,
            "created_at": j.created_at,
        })
    return Response(jobs_data, status=status.HTTP_200_OK)


@api_view(["GET"])
@require_hr_token
def hr_jobs_all(request):
    """Admin endpoint: all jobs including inactive. Used by HR dashboard."""
    seed_initial_jobs()
    jobs_data = []
    for j in JobOpening.objects.all().order_by("id"):
        jobs_data.append({
            "id": j.id,
            "title": j.title,
            "department": j.department,
            "location": j.location,
            "type": j.type,
            "experience": j.experience,
            "description": j.description,
            "responsibilities": [r.strip() for r in j.responsibilities.splitlines() if r.strip()],
            "icon_name": j.icon_name,
            "is_active": j.is_active,
            "created_at": j.created_at,
            "created_by__username": j.created_by.username if j.created_by else "System",
        })
    return Response(jobs_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@require_hr_token
def hr_job_create(request):
    title       = request.data.get("title", "").strip()
    department  = request.data.get("department", "").strip()
    location    = request.data.get("location", "").strip()
    job_type    = request.data.get("type", "").strip()
    description = request.data.get("description", "").strip()
    experience  = request.data.get("experience", "").strip() or "0–2 Years"
    responsibilities_raw = request.data.get("responsibilities", "")
    if isinstance(responsibilities_raw, list):
        responsibilities = "\n".join([str(r).strip() for r in responsibilities_raw if str(r).strip()])
    else:
        responsibilities = str(responsibilities_raw).strip()
    icon_name   = request.data.get("icon_name", "default").strip() or "default"

    errors = {}
    if not title:               errors["title"]       = "Required."
    elif len(title) > 200:      errors["title"]       = "Max 200 characters."
    if not department:          errors["department"]  = "Required."
    elif len(department) > 100: errors["department"]  = "Max 100 characters."
    if not location:            errors["location"]    = "Required."
    elif len(location) > 100:   errors["location"]    = "Max 100 characters."
    if job_type not in ("Full-time", "Part-time", "Internship"):
        errors["type"] = "Must be Full-time, Part-time, or Internship."
    if not description:             errors["description"] = "Required."
    elif len(description) > 5000:   errors["description"] = "Max 5000 characters."
    if len(experience) > 100:       errors["experience"]  = "Max 100 characters."
    if len(responsibilities) > 3000: errors["responsibilities"] = "Max 3000 characters."
    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    # Escape any HTML — job description is always plain text
    safe_description = html.escape(description)
    safe_responsibilities = html.escape(responsibilities)

    job = JobOpening.objects.create(
        title=title,
        department=department,
        location=location,
        type=job_type,
        experience=experience,
        description=safe_description,
        responsibilities=safe_responsibilities,
        icon_name=icon_name,
        created_by=request.hr_user,
    )

    HRAuditLog.objects.create(
        actor=request.hr_user,
        action="JOB_CREATE",
        target_id=job.id,
        detail=job.title,
        ip_address=get_client_ip(request),
    )

    return Response(
        {"id": job.id, "title": job.title, "status": "created"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["DELETE"])
@require_hr_token
def hr_job_delete(request, pk):
    try:
        job = JobOpening.objects.get(pk=pk)
    except JobOpening.DoesNotExist:
        return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

    job.is_active = False
    job.save()

    HRAuditLog.objects.create(
        actor=request.hr_user,
        action="JOB_DEACTIVATE",
        target_id=job.id,
        detail=job.title,
        ip_address=get_client_ip(request),
    )

    return Response({"status": "deactivated", "id": job.id}, status=status.HTTP_200_OK)
