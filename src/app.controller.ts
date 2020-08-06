import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getHello(): string {
    // console.log(req.headers);
    // console.log(res)
    // res.send('hello next')
    return this.appService.getHello();
  }
  // @Get()
  // abc(): string {
  //   return "abc"
  // }
  @Post()
  hello(): string {
    return "hello,nestjs";
  }
}
