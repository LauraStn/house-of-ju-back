"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
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
    async sendUserConfirmation(user, token) {
        const url = `${this.config.get('WEBSITE_URL')}/activation/${token}`;
        const emailHtml = `<p>Bonjour ${user.first_name},</p>
        <p>Voici le lien pour activer votre compte sur le site House Of Ju</p>
            <a href='${url}'>Activer votre compte</a>`;
        await this.transporter.sendMail({
            from: this.config.get('SMTP_EMAIL'),
            to: user.email,
            subject: 'House Of Ju! Confirmez votre Email',
            html: emailHtml,
        });
    }
    async sendResetPassword(user, token) {
        const url = `${this.config.get('WEBSITE_URL')}/changer-mot-de-passe/${token}`;
        const emailHtml = `<p>Hey ${user.first_name},</p>
        <p>Quelqu'un (probablement vous) a demandé à réinitialiser le mot de passe de votre compte.</p>
        <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email et votre mot de passe ne sera pas modifié. Veuillez cliquer sur ce lien : <a href='${url}'>Réinitialiser le mot de passe</a></p>`;
        await this.transporter.sendMail({
            from: this.config.get('SMTP_EMAIL'),
            to: user.email,
            subject: 'House of Ju - Réinitialiser votre mot de passe',
            html: emailHtml,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map