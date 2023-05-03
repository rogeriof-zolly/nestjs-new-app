import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { EmailDto } from 'dtos/email.dto';
import { PhoneDto } from 'dtos/phone.dto';

@Injectable()
export class AppService {

  constructor(private readonly sendGridService: SendGridService){}

  sendPhone(phoneData: PhoneDto) {
    console.log(phoneData)
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
