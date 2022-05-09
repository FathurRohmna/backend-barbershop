import { CreateUserDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  findUnique = this.repository.findUnique;

  async findUserByEmail(email: string) {
    const user = await this.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findUserByPhoneNumber(phone: string) {
    const user = await this.findUnique({
      where: {
        phoneNumber: phone,
      },
    });

    return user;
  }

  async findUserById(userId: string) {
    const user = await this.findUnique({
      where: {
        userId,
      },
    });

    return user;
  }

  async createUser(user: CreateUserDto) {
    const hashPass = await argon2.hash(user.password);

    return this.repository.create({
      data: {
        ...user,
        role: 'USER',
        password: hashPass,
      },
    });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.repository.update({ data, where });
  }
}
