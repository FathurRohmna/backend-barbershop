/* eslint-disable prettier/prettier */
import { PrismaRepository } from './../app_module/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  findMany = this.prisma.feedback.findMany;
  create = this.prisma.feedback.create;
}
