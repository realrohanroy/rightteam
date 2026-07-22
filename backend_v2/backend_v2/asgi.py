"""ASGI config for the RightTeam backend.

Exposes the ASGI callable as a module-level variable named ``application``.
"""
import os
import sys
from pathlib import Path

from django.core.asgi import get_asgi_application

# Make the project root importable so the inner ``backend_v2`` package
# resolves regardless of cwd or host platform.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_v2.settings.dev")

application = get_asgi_application()
