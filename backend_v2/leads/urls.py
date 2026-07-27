from django.urls import path
from . import views

urlpatterns = [
    path("leads",                   views.leads_api,       name="api-leads"),
    path("contact",                 views.contact_api,     name="api-contact"),
    path("newsletter",              views.newsletter_api,  name="api-newsletter"),
    path("career",                  views.career_api,      name="api-career"),
    # HR portal
    path("hr/login",                views.hr_login,        name="hr-login"),
    path("hr/logout",               views.hr_logout,       name="hr-logout"),
    path("hr/jobs",                 views.hr_jobs_public,  name="hr-jobs-public"),
    path("hr/jobs/all",             views.hr_jobs_all,     name="hr-jobs-all"),
    path("hr/jobs/create",          views.hr_job_create,   name="hr-job-create"),
    path("hr/jobs/<int:pk>/delete", views.hr_job_delete,   name="hr-job-delete"),
]
