import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [ConfigModule.forRoot(), SendGridModule.forRoot({
    apikey: process.env.SENDGRID_API_KEY
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
