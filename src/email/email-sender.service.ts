import { Injectable, Optional } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { EmailOptions } from './EmailOptions';

@Injectable()
export class EmailSenderService {
  private transporter: Mail;

  constructor(@Optional() transporter?: Mail) {
    this.transporter =
      transporter ||
      nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  }

  async sendVerification(emailAddress: string, signUpVerifyToken: string) {
    const verificationUrl = `${process.env.SERVICE_URL}/users/email-verification`;

    const mailOptions: EmailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: '[Janus Project] Sign-up verification',
      html: `
        <div>
          <p>Please click the following link to verify your email address:</p>
          <br/>
          <form action="${verificationUrl}" method="GET">
            <input type="hidden" name="token" value="${signUpVerifyToken}"/>
            <input type="submit" value="Verify">
          </form>
        </div>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
