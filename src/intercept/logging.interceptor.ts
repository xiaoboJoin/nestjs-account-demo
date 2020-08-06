import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const res: Response = context.switchToHttp().getResponse();
    return next
      .handle()
      .pipe(
        map((data) => {
          console.log(data);
          // console.log(res.header);
          if (data && data.data && data.data.token) {
            // res.header
            // const Authorization = '${}' data.Token;
            // context.switchToHttp().getResponse().headers.Authorization = `Bearer ${data.Token}`
            // res.set('Authorization', `Bearer ${data.data.token}`);

            // res.header['Authorization'] = 
            // console.log(res.get('Authorization'));
            // res.headers['Authorization'] =  data.Token;
            // res.('token', data.accessToken, { httpOnly: true });
          }
          return data;
        })

        // res.cookie('accessToken', data.Token, { httpOnly: true })

      );
  }
}
