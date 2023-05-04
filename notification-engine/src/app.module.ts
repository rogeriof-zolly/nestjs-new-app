import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from 'interfaces/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY
    }),
    MongooseModule.forRoot('mongodb://localhost/notification'),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
