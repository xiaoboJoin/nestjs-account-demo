import { Controller, Get, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('book')
// @UseGuards(AuthGuard('jwt'))
@ApiTags('books')
@ApiBearerAuth('JWT')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetch(@Req() req: Request): Promise<any> {
    console.log((<any>req).user);
    return await this.bookService.fetch();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() book: BookDto, @Req() req: Request): Promise<any> {
    console.log((<any>req).user);
    const user = (<any>req).user;
    return await this.bookService.create(book, user);
  }
  @Get(':userid')
  async fetchBookByUser(@Req() req: Request): Promise<any> {
    const user = (<any>req).user;
    return await this.bookService.fetchBookByUser(user);
  }

}
