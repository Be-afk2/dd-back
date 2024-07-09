import { Injectable, NestMiddleware, Request} from '@nestjs/common';
import {  Response, NextFunction,} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(@Request() req, res: Response, next: NextFunction,) {
    res.setHeader('title', 'DD_CACERO');
    res.setHeader('description', 'DD_CACERO');

    if(!req.session.user) {
      return res.redirect(process.env.WEB_PATH + 'loginView');
    }
    next();
  }
}
