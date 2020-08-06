import { setUncaughtExceptionCaptureCallback } from "process";
import { Book } from "src/entities/book.entity";


import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class BookDto {
  @ApiProperty({ description:'名称'})
  @IsNotEmpty()
  name: string
  
}