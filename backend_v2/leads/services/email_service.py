import urllib.request
import urllib.error
import json
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def _send_brevo_email(to_email, sender_email, sender_name, subject, html_content):
    api_key = getattr(settings, 'BREVO_API_KEY', '')
    if not api_key:
        logger.warning(f"BREVO_API_KEY is not set. Skipping email to {to_email}.")
        return

    url = 'https://api.brevo.com/v3/smtp/email'
    headers = {
        'api-key': api_key,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    payload = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": html_content
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            logger.info(f"Brevo email successfully sent to {to_email}. Status: {response.status}")
    except urllib.error.HTTPError as e:
        error_info = e.read().decode('utf-8', errors='ignore')
        logger.error(f"Brevo API HTTP Error {e.code}: {error_info}")
        raise Exception(f"Brevo API error: {e.code}")
    except Exception as e:
        logger.error(f"Failed to send Brevo email to {to_email}: {e}")
        raise e

def send_internal_notification(recipient, subject, context):
    """
    Sends an internal notification email about a new lead or contact.
    """
    try:
        # Format context dict into a readable string
        context_str = "\n".join([f"<b>{k}</b>: {v}" for k, v in context.items()])
        html_content = f"<h3>New Submission</h3><p>{context_str}</p>"

        sender_email = getattr(settings, 'BREVO_SENDER_EMAIL', getattr(settings, 'SALES_EMAIL', ''))
        
        _send_brevo_email(
            to_email=recipient,
            sender_email=sender_email,
            sender_name="RightTeam System",
            subject=subject,
            html_content=html_content
        )
    except Exception as e:
        logger.error(f"Internal notification email failed silently: {e}")

def send_acknowledgement(to_email, template_name, context):
    """
    Sends an acknowledgement email to the user who submitted the form.
    """
    try:
        # Define basic templates
        if template_name == "lead_ack":
            subject = "We received your inquiry - RightTeam"
            html_content = "<p>Thank you for reaching out! A member of our team will be in touch shortly to discuss your requirements.</p>"
        elif template_name == "contact_ack":
            subject = "Thank you for contacting RightTeam"
            html_content = "<p>We've received your message and will respond as soon as possible.</p>"
        else:
            subject = "Thank you - RightTeam"
            html_content = "<p>Thank you for your submission!</p>"

        sender_email = getattr(settings, 'BREVO_SENDER_EMAIL', getattr(settings, 'SALES_EMAIL', ''))

        _send_brevo_email(
            to_email=to_email,
            sender_email=sender_email,
            sender_name="RightTeam",
            subject=subject,
            html_content=html_content
        )
    except Exception as e:
        logger.error(f"Acknowledgement email failed silently: {e}")
