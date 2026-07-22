#!/usr/bin/env python
"""Django's command-line utility for administrative tasks.

The default settings module is ``dev`` so a fresh checkout can run
``python manage.py runserver`` without any extra configuration. Production
deployments should set ``DJANGO_SETTINGS_MODULE=backend_v2.settings.prod``.
"""
import os
import sys
from pathlib import Path


def main():
    """Run administrative tasks."""
    # Make the project root importable so the inner ``backend_v2`` package
    # resolves. Django's stock ``manage.py`` relies on the cwd being the
    # project root and PYTHONPATH including ".", which isn't always true on
    # Windows or when the script is invoked from another directory.
    sys.path.insert(0, str(Path(__file__).resolve().parent))

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_v2.settings.dev")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
