# Contact Form Setup Instructions

## Option 1: EmailJS Setup (Recommended)

EmailJS is a free service that allows you to send emails directly from your static website without a backend server.

### Steps to set up EmailJS:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (allows 200 emails/month)

2. **Set up Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose Gmail (or your preferred email provider)
   - Connect your Gmail account
   - Note down the **Service ID**

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template content:
   ```
   Subject: New Portfolio Contact from {{from_name}}
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
   - Note down the **Template ID**

4. **Get Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update Your Code**
   In `assets/js/script.js`, replace these placeholders:
   ```javascript
   // Line 11: Replace YOUR_PUBLIC_KEY
   emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");
   
   // Line 36: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
   emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', templateParams)
   ```

### Example with real values:
```javascript
// Initialize EmailJS
emailjs.init("user_abc123def456");

// Send email
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Option 2: Alternative Solutions

### Formspree (Easy setup)
1. Go to https://formspree.io/
2. Create a free account
3. Create a new form and get the form endpoint
4. Update the form action in HTML:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to your form:
   ```html
   <form data-form netlify>
   ```
2. Deploy to Netlify - forms will work automatically

## Current Fallback

The contact form currently falls back to opening the user's email client with pre-filled information if EmailJS is not configured. This works but requires the user to actually send the email from their email app.

## Testing

After setup:
1. Fill out the contact form
2. Click "Send Message"
3. Check if you receive the email at gauthaampremkumar@gmail.com
4. Form should show "Thank you! Your message has been sent successfully"

## Troubleshooting

- Check browser console for any errors
- Verify all IDs are correct (Public Key, Service ID, Template ID)
- Make sure email service is connected in EmailJS dashboard
- Test template preview in EmailJS dashboard first
