import emailService from '../../../../services/email';

export default {
  async afterCreate(event) {
    const { result } = event;
    await emailService.sendEmail(
      'sergey@reboost.ch',
      'New Contact Form Submission',
      `You received a new message from ${result.email}\n\nName: ${result.your_name}\n\nPhone: ${result.phone_number}\n\nMessage:\n${result.message}\n\n`,
      result.email
    );
  },
};
