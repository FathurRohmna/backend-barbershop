import { AuthModule } from './../auth/auth.module';
import { UserAlreadyExistsByPhone } from './validators/user-notfound-byphone.validator';
import { UserExistsValidatorByEmail } from './validators/user-exists-byemail.validator';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserExistsValidatorByPhone } from './validators/user-exists-byphone.validator';

@Module({
  providers: [
    UserService,
    UserRepository,
    UserExistsValidatorByEmail,
    UserExistsValidatorByPhone,
    UserAlreadyExistsByPhone,
  ],
  exports: [UserService],
})
export class UserModule {}
