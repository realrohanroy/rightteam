"""
HR auth utilities.

- issue_token / verify_token: signed JWT, 8-hour expiry, with kill-switch.
- require_hr_token: decorator for protected views.
- get_client_ip: extracts real IP even behind a reverse proxy.
"""
import datetime
import functools
import jwt
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.response import Response


def _get_secret():
    return settings.HR_JWT_SECRET


def _get_generation():
    """Returns the forced-generation cutoff datetime (UTC)."""
    raw = getattr(settings, "HR_TOKEN_GENERATION", "2026-01-01T00:00:00Z")
    return datetime.datetime.fromisoformat(raw.replace("Z", "+00:00")).replace(tzinfo=None)


def issue_token(user_id: int, username: str) -> str:
    now = datetime.datetime.utcnow()
    payload = {
        "sub": user_id,
        "username": username,
        "iat": int(now.timestamp()),
        "exp": int((now + datetime.timedelta(hours=8)).timestamp()),
    }
    return jwt.encode(payload, _get_secret(), algorithm="HS256")


def verify_token(token: str) -> dict:
    """
    Decodes and validates the token.
    Raises jwt.InvalidTokenError on any failure (expired, bad sig, pre-generation).
    """
    payload = jwt.decode(token, _get_secret(), algorithms=["HS256"])

    # Kill-switch: reject tokens issued before the forced generation timestamp.
    iat = datetime.datetime.utcfromtimestamp(payload["iat"])
    if iat < _get_generation():
        raise jwt.InvalidTokenError("Token predates forced session reset")

    return payload


def get_client_ip(request) -> str:
    """Returns the real client IP, respecting X-Forwarded-For behind proxies."""
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "0.0.0.0")


def require_hr_token(view_func):
    """
    Decorator for views that require a valid HR JWT.
    Sets request.hr_user to the authenticated Django User on success.
    Returns 401 on any auth failure.
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return Response({"error": "Unauthorized"}, status=401)

        token = auth_header[7:]
        try:
            payload = verify_token(token)
            user = User.objects.get(pk=payload["sub"], is_staff=True, is_active=True)
        except (jwt.InvalidTokenError, jwt.ExpiredSignatureError, User.DoesNotExist, Exception):
            return Response({"error": "Unauthorized"}, status=401)

        request.hr_user = user
        return view_func(request, *args, **kwargs)
    return wrapper
