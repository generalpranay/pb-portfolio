import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str) {
  return String(str || '').trim().slice(0, 2000);
}

// Simple in-memory rate limiter (resets per serverless instance)
const submissions = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const max = 5;

  const entry = submissions.get(ip) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= max) return true;

  entry.count++;
  submissions.set(ip, entry);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages sent. Please try again in an hour.' });
  }

  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const subject = sanitize(req.body.subject);
  const message = sanitize(req.body.message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured.');
    return res.status(500).json({ error: 'Email service not configured on this server.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlMessage = message.replace(/\n/g, '<br>');

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#6c5ce7;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;width:80px;">From</td><td><strong>${name}</strong> &lt;${email}&gt;</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Subject</td><td>${subject}</td></tr>
          </table>
          <hr style="border-color:#eee;margin:16px 0;">
          <p style="line-height:1.7;color:#333;">${htmlMessage}</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Pranay Bhalsod" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#6c5ce7;">Thanks for reaching out, ${name}!</h2>
          <p style="line-height:1.7;color:#333;">
            I've received your message and will get back to you within 24 hours.
          </p>
          <p style="line-height:1.7;color:#333;">
            In the meantime, feel free to check out my work:<br>
            <a href="https://github.com/generalpranay" style="color:#00cba9;">github.com/generalpranay</a>
          </p>
          <hr style="border-color:#eee;margin:24px 0;">
          <p style="color:#888;font-size:13px;">
            Pranay Bhalsod — Software Developer<br>
            Calgary, AB · bhalsodph@gmail.com
          </p>
        </div>
      `,
    });

    return res.json({ message: "Message sent successfully! I'll be in touch soon." });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    return res.status(500).json({ error: 'Failed to send message. Please email directly at bhalsodph@gmail.com.' });
  }
}
