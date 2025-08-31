import nodemailer from 'nodemailer';

export default {
  async sendEmail(to: string, subject: string, text: string, replyTo: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true для 465, false для 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        replyTo: replyTo,
        subject,
        text,
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
};