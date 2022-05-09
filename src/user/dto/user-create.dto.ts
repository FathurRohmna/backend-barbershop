/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserExistsValidatorByPhone } from '../validators/user-exists-byphone.validator'
import { UserExistsValidatorByEmail } from '../validators/user-exists-byemail.validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Validate(UserExistsValidatorByEmail)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(UserExistsValidatorByPhone)
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
