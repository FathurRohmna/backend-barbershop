/* eslint-disable prettier/prettier */
import { UserExistsValidatorByPhone } from '../validators/user-exists-byphone.validator';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class OtpConfirmationDto {
  @IsNotEmpty()
  @IsString()
  @Validate(UserExistsValidatorByPhone)
  phoneNumber: string;
}
