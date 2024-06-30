import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

jest.mock('src/config');
jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn(),
  }),
}));

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should resolve to undefined', async () => {
    expect(service.createEmail('test@mail.com')).resolves.toBeUndefined();
  });
});
