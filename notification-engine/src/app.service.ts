import { Injectable } from '@nestjs/common';
import { EmailDto } from 'dtos/email.dto';
import { PhoneDto } from 'dtos/phone.dto';

@Injectable()
export class AppService {

  sendPhone(phoneData: PhoneDto) {
    console.log(phoneData)
  }

  sendEmail(emailData: EmailDto) {
    console.log(emailData);
  }
}
