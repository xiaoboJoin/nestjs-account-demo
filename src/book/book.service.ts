import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private readonly repo: Repository<Book>) {
  }
  async fetch(): Promise<any> {
    return this.repo.find();
  }

  async create(book: BookDto, user: any): Promise<any> {
    const b = new Book();
    b.name = book.name;
    b.userid = user.id;
    return await this.repo.save(b);
  }
  async fetchBookByUser(user: any): Promise<any> {
    return await this.repo.find({
      userid: user.id
    });
  }
}
