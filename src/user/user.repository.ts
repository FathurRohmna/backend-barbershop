/* eslint-disable prettier/prettier */
import { PrismaRepository } from './../app_module/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  update = this.prisma.user.update;
  findUnique = this.prisma.user.findUnique;
  findMany = this.prisma.user.findMany;
  create = this.prisma.user.create;
  count = this.prisma.user.count;
}
