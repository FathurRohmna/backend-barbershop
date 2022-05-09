import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `http://localhost:3000/authentication/email-confirmation?token=${token}&expiresIn=${3600}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Register Confirmation',
      template: 'confirmation',
      context: {
        name: email,
        url,
      },
    });
  }
}
