import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailDto } from 'dtos/email.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PhoneDto } from 'dtos/phone.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('send-email')
  sendEmail(@Payload() emailData: EmailDto): void {
    this.appService.sendEmail(emailData);
  }

  @MessagePattern('send-phone')
  sendPhoneMessage(@Payload() phoneData: PhoneDto): void {
    this.appService.sendPhone(phoneData);
  }
}
