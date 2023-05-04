import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { EmailDto } from './dtos/email.dto';
import { PhoneDto } from './dtos/phone.dto';
import { Observable } from 'rxjs';

@Controller('notifications')
export class NotificationsController implements OnModuleInit{
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true
      }
    }
  })

  client: ClientKafka;

  onModuleInit() {
    const patterns = ['send-email', 'send-phone'];

    patterns.forEach( async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Post('email')
  sendEmail(@Body() emailData: EmailDto): Observable<void> {
    return this.client.send('send-email', emailData);
  }

  @Post('phone')
  sendPhoneMessage(@Body() phoneData: PhoneDto) {
    return this.client.send('send-phone', phoneData);
  }
}
