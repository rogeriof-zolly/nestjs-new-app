import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksSchema } from './schemas/books.schema';
import { BooksEntity } from './entities/books.entities';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([BooksEntity])]
})
export class BooksModule {}
