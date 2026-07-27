"""Django settings shared between dev and prod.

Concrete environments live in ``settings/dev.py`` and ``settings/prod.py`` and
import everything from here via ``from .base import *``.
"""
from pathlib import Path

import environ

# backend_v2/settings/base.py  ->  backend_v2/  ->  repo root
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env(
    # Sensible local default; settings/prod.py forces DEBUG=False.
    DJANGO_DEBUG=(bool, True),
)
environ.Env.read_env(str(BASE_DIR / ".env"))


# Core -----------------------------------------------------------------------

# Must be provided via env in any non-dev environment. No default so a missing
# secret fails fast instead of booting with a known value.
SECRET_KEY = env("DJANGO_SECRET_KEY")

DEBUG = env("DJANGO_DEBUG")
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])


# Applications ---------------------------------------------------------------

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Local
    "leads.apps.LeadsConfig",
]

MIDDLEWARE = [
    # CORS must be first so it can add headers to responses (including those
    # produced by other middleware). This matches the legacy FastAPI app
    # where CORSMiddleware wraps the routers.
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend_v2.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend_v2.wsgi.application"
ASGI_APPLICATION = "backend_v2.asgi.application"


# Database -------------------------------------------------------------------

# settings/prod.py requires DATABASE_URL to be set.
# settings/dev.py falls back to a local SQLite file when it is unset, so a
# fresh clone can run without Postgres (mirrors the FastAPI mock-DB pattern).
DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
    ),
}


# Internationalization -------------------------------------------------------

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# Static / media — placeholders; collectstatic wiring comes later. -----------

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"


# Default primary key type ---------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Auth -----------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# DRF -----------------------------------------------------------------------

REST_FRAMEWORK = {
    # JSON-only responses by default — matches the legacy FastAPI app which
    # only ever returned JSON.
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
}


# CORS -----------------------------------------------------------------------
#
# Comma-separated env list. A single ``*`` is treated as "allow all" — this
# matches the legacy FastAPI default and is implemented via
# ``CORS_ALLOW_ALL_ORIGINS`` because django-cors-headers requires explicit
# schemes in ``CORS_ALLOWED_ORIGINS`` (e.g. ``https://app.example.com``) and
# rejects a bare ``*`` with E013.

_raw_origins = env.list("CORS_ALLOWED_ORIGINS", default=["*"])
if _raw_origins == ["*"]:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = _raw_origins
CORS_ALLOW_CREDENTIALS = True


# Email Settings
BREVO_API_KEY = env('BREVO_API_KEY', default='')
SALES_EMAIL = env('SALES_EMAIL', default='')

BREVO_SENDER_EMAIL = env('BREVO_SENDER_EMAIL', default=SALES_EMAIL)

# HR Portal
HR_JWT_SECRET = env('HR_JWT_SECRET', default='')
HR_TOKEN_GENERATION = env('HR_TOKEN_GENERATION', default='2026-01-01T00:00:00Z')
