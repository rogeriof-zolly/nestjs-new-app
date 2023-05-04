import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { EmailDto } from 'dtos/email.dto';
import { PhoneDto } from 'dtos/phone.dto';
import * as zenvia from '@zenvia/sdk'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'interfaces/notification.interface';
import { NotificationDto } from 'dtos/notification.dto';
import { error } from 'console';

@Injectable()
export class AppService {

  constructor(
    private readonly sendGridService: SendGridService,
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>
  ){}

  zenviaClient = new zenvia.Client(process.env.ZENVIA_TOKEN);
  sms = this.zenviaClient.getChannel('sms');

  async sendPhone(phoneData: PhoneDto): Promise<void> {
    const content = new zenvia.TextContent(`Hello ${phoneData.name}! Your user was created successfully!`);
    await this.sms.sendMessage(
      process.env.KEYWORD, 
      phoneData.phone, 
      content
    ).then( async (response) => {
      await this.registerNewAction({
        userId: phoneData.userId,
        types: 'sms',
        status: 'SUCCESS',
        response: response
      });
    }).catch( async (error) => {
      await this.registerNewAction({
        userId: phoneData.userId,
        types: 'sms',
        status: 'ERROR',
        response: error
      });
    });;
  }

  async sendEmail(emailData: EmailDto): Promise<void> {
    await this.sendGridService.send({
      from: process.env.FROM_EMAIL,
      to: emailData.email,
      subject: 'User created!',
      text: `User ${emailData.name} created successfully!`
    }).then( async (response) => {
      await this.registerNewAction({
        userId: emailData.userId,
        types: 'email',
        status: 'SUCCESS',
        response: response
      });
    }).catch( async (error) => {
      await this.registerNewAction({
        userId: emailData.userId,
        types: 'email',
        status: 'ERROR',
        response: error
      });
    });
  }

  async registerNewAction(mongoData: NotificationDto){
    const data = new this.notificationModel(mongoData);
    return data.save();
  }
}
