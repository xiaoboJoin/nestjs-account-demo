import { Injectable, NestMiddleware, } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('InitMiddleware');
    console.log(req.cookies);
    // req.set()
    // req.cookies['']
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieGlhb2JvIiwiaWQiOiI5N2UyYjgxMy1mY2Y2LTQ5ZjItYmNkMy1mNGUwNzdhMzFhNDciLCJpYXQiOjE1OTY3MDc4NDgsImV4cCI6MTU5NjczNjY0OH0.Ok4Q2Xzl5Wvy3w-mIgnbKXoYtBcf5P4at42S953Ad54"

    next();
  }
}
