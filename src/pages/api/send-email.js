// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { recipients } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mayanksunny786@gmail.com',
      pass: 'meim uwim srgh wuyw',
    },
  });

  try {
    // Loop through recipients and send customized emails
    for (const { to, subject, text } of recipients) {
      const mailOptions = {
        from: 'mayanksunny786@gmail.com',
        to,
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
