"""Production settings.

Inherits everything from ``base`` and forces safety defaults:
- ``DEBUG = False``
- ``DATABASE_URL`` must be set (no SQLite fallback)
- HTTPS / HSTS hardening for the common case of a TLS-terminating reverse proxy

Use with ``DJANGO_SETTINGS_MODULE=backend_v2.settings.prod``.
"""
from .base import *  # noqa: F401, F403
from .base import env  # noqa: F401 — re-exported explicitly for IDEs

DEBUG = False

# Database is inherited from base, which calls env.db("DATABASE_URL") without
# a default. In prod this will raise if DATABASE_URL is unset, which is what
# we want — failing to boot is better than booting with SQLite in prod.
DATABASES = {
    "default": env.db("DATABASE_URL"),
}

# Behind a TLS-terminating reverse proxy (nginx, ELB, etc.) the original
# request scheme is lost; honour the X-Forwarded-Proto header that the proxy
# sets so request.is_secure() and the redirect helpers see the real scheme.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Force HTTPS at the application layer as a belt-and-braces alongside the
# proxy. Can be disabled via DJANGO_SECURE_SSL_REDIRECT=False for edge cases
# where the proxy already redirects and the app can't see the header.
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)

# Cookies are only ever sent over HTTPS in prod.
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# HSTS — values are conservative defaults; tune SECURE_HSTS_SECONDS up to
# 31536000 once you're confident the domain will stay on HTTPS.
SECURE_HSTS_SECONDS = 60
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Raise an error if CORS_ALLOWED_ORIGINS is left as wildcard in production.
from django.core.exceptions import ImproperlyConfigured

if globals().get("CORS_ALLOW_ALL_ORIGINS", False):
    raise ImproperlyConfigured(
        "CORS_ALLOWED_ORIGINS cannot be '*' (or allow all origins) in production. "
        "Please set CORS_ALLOWED_ORIGINS to a list of specific origins in the environment."
    )

