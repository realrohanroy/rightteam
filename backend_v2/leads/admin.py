from django.contrib import admin
from leads.models import Lead, ContactMessage, Newsletter, JobApplication


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "full_name",
        "email",
        "phone",
        "service_slug",
        "source",
        "created_at",
    )
    list_filter = (
        "service_slug",
        "state",
        "business_stage",
        "source",
        "created_at",
    )
    search_fields = (
        "reference",
        "full_name",
        "email",
        "phone",
        "service_slug",
        "notes",
    )
    readonly_fields = ("reference", "created_at")
    ordering = ("-created_at",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "full_name",
        "email",
        "phone",
        "subject",
        "created_at",
    )
    list_filter = ("created_at",)
    search_fields = (
        "reference",
        "full_name",
        "email",
        "phone",
        "subject",
        "message",
    )
    readonly_fields = ("reference", "created_at")
    ordering = ("-created_at",)


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    list_filter = ("created_at",)
    search_fields = ("email",)
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "position",
        "resume_url",
        "created_at",
    )
    list_filter = ("position", "created_at")
    search_fields = (
        "name",
        "email",
        "phone",
        "position",
        "message",
    )
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
