import { Injectable } from '@nestjs/common';
import { Request, Response } from "express";


@Injectable()
export class AppService {
  count: number;
  constructor() {
    this.count = 0;
  }
  getHello(): any {
    this.count++;
    return 'Hello World!' + this.count;
  }
}
