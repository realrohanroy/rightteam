"""Local development settings.

Importing from ``.base`` pulls in everything else. The only overrides are:
- ``DEBUG`` is forced on
- ``DATABASES`` falls back to a local SQLite file if ``DATABASE_URL`` is unset
  so a fresh checkout runs without Postgres
- console email backend so any error emails land in the runserver output
"""
from .base import *  # noqa: F401, F403
from .base import BASE_DIR, env  # noqa: F401 — re-exported explicitly for IDEs

DEBUG = True

# Allow DATABASE_URL to be unset in dev: a sqlite file in the project root
# works without any external service.
DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
    ),
}

# Make any server-error emails visible in the runserver console instead of
# trying to send them.
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
