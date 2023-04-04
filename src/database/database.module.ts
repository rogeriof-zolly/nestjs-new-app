import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksSchema } from 'src/books/schemas/books.schema';
import { UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'application',
    entities: [UserSchema, BooksSchema],
    synchronize: true
  })]
})
export class DatabaseModule {}
