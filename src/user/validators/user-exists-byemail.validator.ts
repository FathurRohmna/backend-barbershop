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
export class UserExistsValidatorByEmail
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {

    if (!email) {
      throw new BadRequestException('Validation failed');
    }

    const result = await this.userService.findUnique({
      where : {
        email: email
      }
    });
    
    return !result;
  }

  defaultMessage(_args: ValidationArguments): string {
    return `User already exists.`;
  }
}
