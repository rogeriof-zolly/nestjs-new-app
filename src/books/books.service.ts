import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from './entities/books.entities';
import { Repository } from 'typeorm';
import { BooksDto } from './dtos/books.dto';
import { BooksSchema } from './schemas/books.schema';
import { Books } from './interfaces/books.interface';

@Injectable()
export class BooksService {
  async deleteBook(id: number) {
    const foundBook = await this.booksRepository.findOneBy({id});

    if(!foundBook){
      throw new NotFoundException(`Book with id ${id} was not found.`);
    }

    await this.booksRepository.delete({id});
  }

  
  constructor(
    @InjectRepository(BooksSchema)
    private booksRepository: Repository<BooksEntity>
    ){}
    
  async allBooks(): Promise<BooksEntity[]> {
    return this.booksRepository.find();
  }

  async createBook(bookDto: BooksDto): Promise<Books> {
    return this.booksRepository.save(bookDto);
  }
}
