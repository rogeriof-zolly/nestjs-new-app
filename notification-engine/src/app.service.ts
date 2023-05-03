import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { EmailDto } from 'dtos/email.dto';
import { PhoneDto } from 'dtos/phone.dto';
import * as zenvia from '@zenvia/sdk'

@Injectable()
export class AppService {

  constructor(private readonly sendGridService: SendGridService){}

  zenviaClient = new zenvia.Client(process.env.ZENVIA_TOKEN);
  sms = this.zenviaClient.getChannel('sms');

  async sendPhone(phoneData: PhoneDto): Promise<void> {
    const content = new zenvia.TextContent(`Hello ${phoneData.name}! Your user was created successfully!`);
    await this.sms.sendMessage(process.env.KEYWORD, phoneData.phone, content);
  }

  async sendEmail(emailData: EmailDto): Promise<void> {
    await this.sendGridService.send({
      from: process.env.FROM_EMAIL,
      to: emailData.email,
      subject: 'User created!',
      text: `User ${emailData.name} created successfully!`
    });
  }
}
