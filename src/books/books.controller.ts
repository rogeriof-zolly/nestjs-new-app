import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dtos/books.dto';

@Controller('books')
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ){}

  @Get()
  async allBooks(){
    return this.booksService.allBooks();
  }

  @Post()
  async createBook(@Body() bookDto: BooksDto){
    return this.booksService.createBook(bookDto);
  }
  
  @Delete(':id')
  async deleteBook(@Param('id') id: number){
    await this.booksService.deleteBook(id);
    return this.booksService.allBooks();
  }
}
