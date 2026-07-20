import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const getEnvValue = (key) => process.env[key]?.trim();

const googleUser = getEnvValue('GOOGLE_USER');
const googleClientId = getEnvValue('GOOGLE_CLIENT_ID');
const googleClientSecret = getEnvValue('GOOGLE_CLIENT_SECRET');
const googleRefreshToken = getEnvValue('GOOGLE_REFRESH_TOKEN');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: googleUser,
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    refreshToken: googleRefreshToken,
  },
});

const hasMailConfig = Boolean(googleUser && googleClientId && googleClientSecret && googleRefreshToken);

if (process.env.MAIL_VERIFY_ON_START === 'true' && hasMailConfig) {
  transporter.verify((error) => {
    if (error) {
      console.error('Error connecting to email server:', error);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
} else if (!hasMailConfig) {
  console.warn('Email credentials are not configured. Skipping mail transport verification.');
}

export async function sendEmail({ to, subject, html, text }) {
  if (!hasMailConfig) {
    console.warn('Email credentials are not configured. Skipping email send.');
    return { skipped: true, message: 'Email credentials are not configured' };
  }

  const mailOptions = {
    from: googleUser,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    throw error;
  }
}

export default sendEmail;