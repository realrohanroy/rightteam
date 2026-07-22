"""Project URL configuration.

The legacy FastAPI app served everything under ``/api/`` (e.g. ``/api/leads``,
``/api/contact``). We keep the same prefix so the existing integration test
suite (``tests/backend_test.py``) works against the new backend once views
are added.
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    # All app URLs are mounted under /api/. The leads app's own urls.py adds
    # the /leads and /contact paths in the next pass.
    path("api/", include("leads.urls")),
]
