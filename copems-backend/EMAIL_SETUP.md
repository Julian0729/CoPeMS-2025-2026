# 📧 Email Configuration Setup Guide

## Quick Setup for Gmail (Recommended)

### 1. Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled

### 2. Generate App Password

1. Go to Google Account → Security → App passwords
2. Select "Mail" and your device
3. Copy the generated 16-character password

### 3. Update Backend .env File

```env
# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
EMAIL_FROM=COPEMS <your_email@gmail.com>
FRONTEND_URL=http://localhost:3000
```

## Alternative: Use Your Existing EmailJS (Quick Test)

If you want to use your existing EmailJS setup for testing, update the backend email service to use HTTP requests instead of nodemailer:

Your EmailJS credentials:

- Service ID: service_yhi7znt
- Template ID: template_dfyy3eq
- Public Key: S2qQZi2YjAmbxclcp

## Test Email Service

Run this to test your email configuration:

```bash
cd backend
node -e "require('./services/emailService').testConnection()"
```

## Email Template Features

The email includes:

- ✅ Professional COPEMS branding
- ✅ Clear call-to-action button
- ✅ Security information (24-hour expiry)
- ✅ Plain text fallback
- ✅ Mobile-responsive design
- ✅ System benefits overview

## Troubleshooting

**Gmail "Less secure app access" error:**

- Use App Passwords instead (see step 2 above)

**Email not sending:**

- Check your EMAIL_USER and EMAIL_PASSWORD in .env
- Ensure 2FA is enabled and App Password is correct
- Check Gmail SMTP is not blocked by firewall

**Template issues:**

- All templates are generated dynamically
- No external template files needed
