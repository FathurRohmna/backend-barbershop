/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'user', async: true })
@Injectable()
export class UserAlreadyExistsByPhone
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(phone: string, args: ValidationArguments) {
    if (!phone) {
      throw new BadRequestException('Validation failed');
    }

    const result = await this.userService.findUserByPhoneNumber(phone);

    return !!result;
  }

  defaultMessage(_args: ValidationArguments): string {
    return `User Not Found.`;
  }
}
