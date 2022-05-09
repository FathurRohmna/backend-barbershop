/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    if (err) {
      throw err;
    }
    if (info && info instanceof Error) {
      if (info instanceof JsonWebTokenError) {
        info = String(info);
      }
      throw new UnauthorizedException(info);
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
