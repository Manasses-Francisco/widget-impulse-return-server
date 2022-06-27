import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8e2aa35babaf41",
    pass: "1c2f945e31e5e6",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <avondongo@gmail.com>",
      to: "<manassensevani@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
