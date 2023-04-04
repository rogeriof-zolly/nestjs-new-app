import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './users/schemas/users.schema';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [UsersModule, DatabaseModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
