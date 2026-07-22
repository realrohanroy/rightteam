from django.urls import path
from . import views

urlpatterns = [
    path("leads", views.leads_api, name="api-leads"),
    path("contact", views.contact_api, name="api-contact"),
    path("newsletter", views.newsletter_api, name="api-newsletter"),
    path("career", views.career_api, name="api-career"),
]
