import uuid
from datetime import datetime, timezone


def make_reference(prefix: str) -> str:
    """Return a reference string of the form ``RT/{prefix}/{YYYYMMDD}/{6HEX}``.

    ``prefix`` is the type marker (e.g. "Q" for leads, "C" for contact).
    """
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d")
    short = uuid.uuid4().hex[:6].upper()
    return f"RT/{prefix}/{stamp}/{short}"
