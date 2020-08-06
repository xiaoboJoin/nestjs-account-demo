import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { SmsService } from './sms/sms.service';
import { BookModule } from './book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule, AuthModule, BookModule],
  providers: [SmsService],
  controllers: [],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
