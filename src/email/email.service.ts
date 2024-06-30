import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from 'src/config';

@Injectable()
export class EmailService {
  async createEmail(email) {
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      secure: true,
      auth: {
        user: config.EMAIL_SENDER_EMAIL,
        pass: config.EMAIL_SENDER_PASS,
      },
    });

    await transporter.sendMail({
      from: config.EMAIL_SENDER_EMAIL,
      to: email,
      subject: 'Hello NestJS | Test',
      text: 'This is a test email sent from Hello NestJS.',
    });
  }
}
