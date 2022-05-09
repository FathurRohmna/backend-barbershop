import { JwtPayload } from './types/JwtPayload.interface';
import { RegisterUserDto } from '../user/dto/user-register.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validate(data: RegisterUserDto) {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    if (!(await argon2.verify(user.password, data.password))) {
      throw new HttpException(
        'Wrong password/username',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async login(user) {
    const date = new Date();

    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
    };
    const refreshId = user.userId + this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      refresh_token: refreshId,
      access_token_expires:
        date.getTime() + this.configService.get('JWT_EXPIRATION_TIME'),
      refresh_token_expires: 60 * 60 * 24 * 7,
    };
  }
}
