import { MailService } from './../mail/mail.service';
import { CreateUserDto } from '../user/dto/user-create.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProduces,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { RegisterUserDto } from '../user/dto/user-register.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { UserService } from './../user/user.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('/signup')
  @ApiBadRequestResponse({
    description: 'make sure all field are filled and valid',
  })
  @ApiCreatedResponse({
    description: 'User Successfully created',
  })
  @ApiOkResponse({
    description: 'access token and User Data',
  })
  async signUp(@Body(new ValidationPipe()) createUser: CreateUserDto) {
    const newUser = await this.userService.createUser(createUser);
    const token = await this.authService.login(newUser);

    await this.mailService.sendUserConfirmation(
      newUser.email,
      token.access_token,
    );

    return { ...token, user: newUser };
  }

  @Post('/signin')
  @ApiBadRequestResponse({
    description: 'username | password could not be null',
  })
  @ApiUnauthorizedResponse({ description: 'Authentication Failed' })
  @ApiOkResponse({
    description: 'access token and User Data',
  })
  @ApiProduces('application/json')
  async signIn(@Body(new ValidationPipe()) loginDto: RegisterUserDto) {
    const validUser = await this.authService.validate(loginDto);
    const token = await this.authService.login(validUser);

    return { ...token, user: validUser };
  }
}
