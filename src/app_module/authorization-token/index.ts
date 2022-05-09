/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizationToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    const [, token] = String(authorization).split(' ');

    return token;
  },
);
