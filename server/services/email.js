import nodemailer from 'nodemailer';

/**
 * Reusable Gmail SMTP Email Service
 * Configured via server-side environment variables:
 * SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, APP_BASE_URL
 */

let cachedTransporter = null;

export function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const adminEmail = process.env.ADMIN_EMAIL || user || 'uthayanvanojan5@gmail.com';
  const appBaseUrl = (process.env.APP_BASE_URL || 'https://portfolio-website-src.vercel.app').replace(/\/$/, '');

  const isConfigured = Boolean(user && pass && pass !== 'YOUR_NEW_GOOGLE_APP_PASSWORD');

  return {
    host,
    port,
    secure,
    user,
    pass,
    adminEmail,
    appBaseUrl,
    isConfigured
  };
}

export function getTransporter() {
  const config = getSmtpConfig();
  if (!config.isConfigured) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  return cachedTransporter;
}

/**
 * Verify SMTP connection safely without exposing credentials
 */
export async function verifySmtpConnection() {
  const config = getSmtpConfig();
  if (!config.isConfigured) {
    return {
      configured: false,
      connected: false,
      message: 'SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in environment variables.'
    };
  }

  try {
    const transporter = getTransporter();
    await transporter.verify();
    return {
      configured: true,
      connected: true,
      host: config.host,
      port: config.port,
      user: config.user.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      adminEmail: config.adminEmail,
      message: 'Gmail SMTP connection verified and ready.'
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      error: err.message,
      message: `SMTP connection failed: ${err.message}`
    };
  }
}

/**
 * Luxury HTML Email Template Wrapper matching Champagne-Gold & Cinematic Navy aesthetics
 */
function wrapHtmlEmail(title, eyebrow, contentHtml, actionButton = null) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05080f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #05080f; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background: linear-gradient(145deg, #0a1120 0%, #05080f 100%); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px; background: linear-gradient(90deg, #0e172a 0%, #152238 100%); border-bottom: 1px solid rgba(212, 175, 55, 0.25);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #d4af37; padding: 4px 10px; background: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 9999px;">
                      ${eyebrow || 'ARCHITECTURAL PORTFOLIO'}
                    </span>
                    <h1 style="margin: 12px 0 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                      ${title}
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <div style="width: 40px; height: 40px; border-radius: 10px; border: 1px solid #d4af37; background: linear-gradient(135deg, #d4af37 0%, #152238 100%); text-align: center; line-height: 40px; font-weight: 800; color: #05080f; font-size: 14px;">
                      UV
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px; font-size: 15px; line-height: 1.65; color: #cbd5e1;">
              ${contentHtml}

              ${actionButton ? `
              <div style="margin: 32px 0 16px; text-align: center;">
                <a href="${actionButton.url}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f3d078 0%, #d4af37 50%, #aa8425 100%); color: #05080f; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 9999px; letter-spacing: 0.05em; box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);">
                  ${actionButton.label} &rarr;
                </a>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background: #03060a; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 6px;">Uthayagunasingam Vanojan &bull; Solutions Architect &amp; Software Engineer</p>
              <p style="margin: 0; font-family: monospace; font-size: 11px; color: #475569;">Portfolio Console &bull; Sri Lanka &bull; Automated System Delivery</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 1. Send Password Reset Email to Admin
 */
export async function sendPasswordResetEmail({ resetToken, toEmail }) {
  const config = getSmtpConfig();
  const recipient = toEmail || config.adminEmail;
  const resetUrl = `${config.appBaseUrl}/?resetToken=${encodeURIComponent(resetToken)}`;

  const subject = '🔒 Security Request: Admin Password Reset Token';
  const text = `
Security Alert: Admin Password Reset Request

A password reset request was initiated for your portfolio administration console (vanojanSE).

Click or paste this secure link to set your new password:
${resetUrl}

This link is valid for 15 minutes and can only be used once.
If you did not request this, please disregard this email. Your credentials remain safe.
  `.trim();

  const contentHtml = `
    <p style="margin-top: 0;">Hello <strong>Uthayagunasingam Vanojan</strong>,</p>
    <p>A request was received to reset the administrative password for your portfolio executive console (<strong>vanojanSE</strong>).</p>
    
    <div style="padding: 16px; margin: 20px 0; background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; border-radius: 6px;">
      <p style="margin: 0; font-size: 14px; color: #f1f5f9;">
        <strong>Validity:</strong> 15 minutes single-use token.<br>
        <strong>Account:</strong> vanojanSE &bull; Executive Administrator
      </p>
    </div>

    <p>Click the button below to authenticate and enter your new access passphrase:</p>
  `;

  const html = wrapHtmlEmail(
    'Admin Password Reset',
    'SECURITY &bull; AUTHENTICATION',
    contentHtml,
    { label: 'Reset Admin Password', url: resetUrl }
  );

  const transporter = getTransporter();
  if (!transporter) {
    console.warn('[SMTP Warning] Gmail SMTP not configured, logging reset URL locally for admin:', resetUrl);
    return {
      sent: false,
      simulated: true,
      message: 'SMTP not configured in environment. Reset token generated and logged for development.',
      resetUrl
    };
  }

  const info = await transporter.sendMail({
    from: `"Vanojan Security Console" <${config.user}>`,
    to: recipient,
    subject,
    text,
    html
  });

  return {
    sent: true,
    messageId: info.messageId,
    recipient
  };
}

/**
 * 2. Send Contact Form Notification to Admin
 */
export async function sendContactNotificationToAdmin({ name, email, subject, message, id }) {
  const config = getSmtpConfig();
  const adminInboxUrl = `${config.appBaseUrl}/?openAdmin=inbox`;

  const emailSubject = `📬 New Portfolio Inquiry from ${name}: "${subject || 'General Inquiry'}"`;
  const text = `
New Portfolio Contact Message Received:

From: ${name} (${email})
Subject: ${subject || 'General Inquiry'}
Received: ${new Date().toLocaleString()}

Message:
${message}

View and reply via your Executive Console:
${adminInboxUrl}
  `.trim();

  const contentHtml = `
    <p style="margin-top: 0;">You have received a new high-priority message through your live portfolio contact portal:</p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 18px;">
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px; width: 90px;"><strong>Sender:</strong></td>
        <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;"><strong>Email:</strong></td>
        <td style="padding: 6px 0; color: #d4af37; font-size: 14px;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;"><strong>Subject:</strong></td>
        <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">${subject || 'General Inquiry'}</td>
      </tr>
    </table>

    <div style="padding: 18px; margin: 20px 0; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px;">
      <div style="font-size: 11px; font-weight: 700; color: #d4af37; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
        Visitor Message Body:
      </div>
      <p style="margin: 0; color: #e2e8f0; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${message}</p>
    </div>

    <p style="font-size: 13px; color: #94a3b8;">
      You can compose and dispatch an authenticated reply directly to ${name} from your Executive Dashboard.
    </p>
  `;

  const html = wrapHtmlEmail(
    'New Contact Inquiry',
    'PORTFOLIO INBOX NOTIFICATION',
    contentHtml,
    { label: 'Open Admin Inbox & Reply', url: adminInboxUrl }
  );

  const transporter = getTransporter();
  if (!transporter) {
    return {
      sent: false,
      simulated: true,
      message: 'SMTP not configured. Message stored in database.'
    };
  }

  const info = await transporter.sendMail({
    from: `"Vanojan Portfolio" <${config.user}>`,
    to: config.adminEmail,
    replyTo: email,
    subject: emailSubject,
    text,
    html
  });

  return {
    sent: true,
    messageId: info.messageId
  };
}

/**
 * 3. Send Admin Reply to Contact Visitor
 */
export async function sendAdminReplyToVisitor({ recipientEmail, recipientName, replySubject, replyBody, originalMessage }) {
  const config = getSmtpConfig();

  const subject = replySubject || `Re: In response to your inquiry — Uthayagunasingam Vanojan`;
  const text = `
Hello ${recipientName || 'there'},

Thank you for reaching out through my portfolio.

${replyBody}

Best regards,
Uthayagunasingam Vanojan
Full-Stack Software Engineer & Solutions Architect
https://portfolio-website-src.vercel.app

---
Original Message:
${originalMessage || ''}
  `.trim();

  const contentHtml = `
    <p style="margin-top: 0;">Hello <strong>${recipientName || 'there'}</strong>,</p>
    <p>Thank you for getting in touch through my portfolio. Here is my response to your inquiry:</p>

    <div style="padding: 22px; margin: 24px 0; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
      <p style="margin: 0; color: #f8fafc; font-size: 15px; white-space: pre-wrap; line-height: 1.7;">${replyBody}</p>
    </div>

    ${originalMessage ? `
    <div style="padding: 14px 18px; margin: 20px 0; background: rgba(255, 255, 255, 0.02); border-left: 2px solid #64748b; border-radius: 4px; font-size: 13px; color: #94a3b8;">
      <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; margin-bottom: 6px;">Your Original Message:</div>
      <p style="margin: 0; white-space: pre-wrap;">${originalMessage}</p>
    </div>
    ` : ''}

    <p style="font-size: 14px; color: #cbd5e1; margin-top: 24px;">
      Warm regards,<br>
      <strong style="color: #d4af37;">Uthayagunasingam Vanojan</strong><br>
      <span style="font-size: 12px; color: #94a3b8;">Full-Stack Software Engineer &amp; Solutions Architect</span>
    </p>
  `;

  const html = wrapHtmlEmail(
    subject,
    'DIRECT EXECUTIVE RESPONSE',
    contentHtml,
    { label: 'Visit Portfolio', url: config.appBaseUrl }
  );

  const transporter = getTransporter();
  if (!transporter) {
    throw new Error('Gmail SMTP is not configured on the server. Please add SMTP_USER and SMTP_PASS in environment variables.');
  }

  const info = await transporter.sendMail({
    from: `"Uthayagunasingam Vanojan" <${config.user}>`,
    to: recipientEmail,
    replyTo: config.adminEmail,
    subject,
    text,
    html
  });

  return {
    sent: true,
    messageId: info.messageId,
    recipientEmail
  };
}

/**
 * 4. Send Test Email for Admin Settings Verification
 */
export async function sendTestEmail(targetEmail) {
  const config = getSmtpConfig();
  const recipient = targetEmail || config.adminEmail;

  const subject = '✨ Gmail SMTP Diagnostic Test — Portfolio Executive Console';
  const text = `
This is a diagnostic test email dispatched from your portfolio executive console.

Gmail SMTP Configuration:
- Host: ${config.host}
- Port: ${config.port}
- Secure: ${config.secure}
- Sender: ${config.user}
- Time: ${new Date().toISOString()}

All email systems are functional.
  `.trim();

  const contentHtml = `
    <p style="margin-top: 0;">This diagnostic email confirms that your <strong>Gmail SMTP connection</strong> is active, fully verified, and ready for production operations.</p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 10px; padding: 18px;">
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px; width: 130px;"><strong>SMTP Service:</strong></td>
        <td style="padding: 6px 0; color: #10b981; font-size: 14px;"><strong>Google Gmail SMTP (Active)</strong></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;"><strong>Host &amp; Port:</strong></td>
        <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">${config.host}:${config.port} (TLS / SSL)</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;"><strong>Configured Sender:</strong></td>
        <td style="padding: 6px 0; color: #d4af37; font-size: 14px;">${config.user}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;"><strong>Base Production URL:</strong></td>
        <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">${config.appBaseUrl}</td>
      </tr>
    </table>

    <p style="font-size: 13px; color: #10b981;">
      &check; Password Reset tokens, Visitor notifications, and Admin replies will be delivered seamlessly.
    </p>
  `;

  const html = wrapHtmlEmail(
    'SMTP Diagnostic Success',
    'SYSTEM DIAGNOSTIC &bull; VERIFIED',
    contentHtml,
    { label: 'Return to Executive Console', url: config.appBaseUrl }
  );

  const transporter = getTransporter();
  if (!transporter) {
    throw new Error('SMTP credentials missing. Please set SMTP_USER and SMTP_PASS in your environment.');
  }

  const info = await transporter.sendMail({
    from: `"Vanojan Executive Console" <${config.user}>`,
    to: recipient,
    subject,
    text,
    html
  });

  return {
    sent: true,
    messageId: info.messageId,
    recipient
  };
}
