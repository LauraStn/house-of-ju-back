import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/auth/validate/${token}`;
    const emailHtml = `<p>Hey ${user.first_name},</p>
        <p>Your requested an account creation on wicromania</p>
            <a href='${url}'>You requested an account creation on wicromania, click here 
            to activate your account</a>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHtml,
    });
  }

  async sendResetPassword(user: User, token: string) {
    const url = `http://localhost:3000/changer-mot-de-passe/${token}`;
    const emailHtml = `<p>Hey ${user.first_name},</p>
        <p>Quelqu'un (probablement vous) a demandé à réinitialiser le mot de passe de votre compte.</p>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email et votre mot de passe ne sera pas modifié. Veuillez cliquer sur ce lien : <a href='${url}'>Réinitialiser le mot de passe</a></p>
`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Reset password',
      html: emailHtml,
    });
  }
}
