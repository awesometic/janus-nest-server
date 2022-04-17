import { EmailSenderService } from './email-sender.service';

describe('EmailSenderService', () => {
  const emailService = new EmailSenderService({
    sendMail: jest.fn().mockImplementation((mailOptions) => mailOptions),
  } as any);

  const email = 'test@test.com';
  const password = 'password';
  const verifyToken = 'verifyToken';

  process.env = {
    SERVICE_URL: '',
    EMAIL_USER: email,
    EMAIL_PASSWORD: password,
  };

  it('should configure mail options properly', async () => {
    const results = await emailService.sendVerification(email, verifyToken);

    expect(results).toHaveProperty('from', email);
  });
});
