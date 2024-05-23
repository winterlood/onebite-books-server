import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 개발 모드일 때만 딜레이 적용
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        next();
      }, 5000); // 1초 딜레이
    } else {
      next();
    }
  }
}
