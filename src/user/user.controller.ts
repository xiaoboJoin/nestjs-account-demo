/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException, HttpStatus, Redirect, Controller, Post, HttpCode, Body, Get, UseGuards, UsePipes, Request, Next, Response, Header, UseInterceptors, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './user.dto';
import { UserPipe } from '../user.pipe';
import { AccessTokenInterceptor } from 'src/intercept/access-token.interceptor';
import { LoggingInterceptor } from 'src/intercept/logging.interceptor';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';




@Controller('user')
@ApiTags('users')
export class UserController {

  constructor(private readonly usersService: UserService) { }
  @Post('find')
  async find(@Body() body: any) {
    console.log(body);
    const users = await this.usersService.getUsers();
    return users
  }
  @Post('create')
  async createOne(@Body() user: UserDto) {
    return await this.usersService.insertOne(user.name);
  }
  @Post('findone')
  async findOne(@Body() user: UserDto) {
    return await this.usersService.findOne(user.name);
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    return await this.usersService.register(body);
  }

  @Post('login')
  @HttpCode(201)
  @UseInterceptors(LoggingInterceptor)
  @UsePipes(new UserPipe())
  async login(@Body() userDto: UserDto) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // console.log(userDto.name);
    // console.log(userDto.password);
    return await this.usersService.login(userDto);
    // return 'This action adds a new cat';
    // res.send(body)
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  async profile(@Req() req: Request) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // console.log(userDto.name);
    // console.log(userDto.password);
    const user = (<any>req).user;
    return await this.usersService.profile(user.id);
    // return 'This action adds a new cat';
    // res.send(body)
  }
}
