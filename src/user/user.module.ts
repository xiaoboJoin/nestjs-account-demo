import { Module, forwardRef,MiddlewareConsumer, NestModule,RequestMethod} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import  {InitMiddleware }  from '../init.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule implements NestModule  {
configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(InitMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL })
		}
}
