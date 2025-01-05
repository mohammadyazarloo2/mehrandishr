import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
}
