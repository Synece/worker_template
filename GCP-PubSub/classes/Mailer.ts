import * as nodemailer from 'nodemailer';

interface IEmailService {
    sendMail(mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo>;
}

export class Mailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USERNAME, // defined in your environment variables
                pass: process.env.EMAIL_PASSWORD  // defined in your environment variables
            }
        });
    }

    async sendMail(to: string, subject: string, body: string, options: Partial<nodemailer.SendMailOptions> = {}): Promise<nodemailer.SentMessageInfo> {
        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: process.env.EMAIL_FROM, // Make sure to set this in your environment variables
                to: to,
                subject: subject,
                html: body,
                ...options
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}