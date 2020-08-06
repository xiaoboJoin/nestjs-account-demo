/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Inject, forwardRef, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
// import sequelize from '../database/sequelize';
import { encryptPassword } from '../utils/cryptogram'; // 引入加密函数
import { AuthService } from '../auth/auth.service';
import { UserDto } from './user.dto';


@Injectable()
export class UserService {
  salt: any;
  constructor(@InjectRepository(User) private readonly repo: Repository<User>, @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {
    this.salt = "makeSlat";
  }

  public async getUsers() {
    return await this.repo.find();
  }

  public async insertOne(name) {
    const user = new User();
    user.name = name;
    return this.repo.save(user);
  }

  public async findOne(name) {

    return await this.repo.findOne({ name: name });
  }

  public async register(userDto: UserDto): Promise<any> {
    const name = userDto.name;
    const pass = userDto.password;
    const user = await this.repo.findOne({ name: name });
    if (user) {
      return false;
    } else {
      const user = new User();
      user.name = name;
      user.password = encryptPassword(pass, this.salt);
      const res = await this.repo.save(user);
      const { password, ...result } = res;
      return result;
    }
  }

  public async login(params: any): Promise<any> {
    // const { name, password } = params;
    // const user = await this.repo.findOne({ name: name });
    // console.log(user);
    // const pass = encryptPassword(password, this.salt)
    // console.log(pass);
    // if (pass == user.password) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return {};
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(params.name, params.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
  async profile(id: string): Promise<any> {
    return await this.repo.findOne(id, { relations: ['books'] });
  }
}
