/* eslint-disable prettier/prettier */
import { PrismaRepository } from './../app_module/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BarberRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  update = this.prisma.barberUser.update;
  findUnique = this.prisma.barberUser.findUnique;
  create = this.prisma.barberUser.create;
  findMany = this.prisma.barberUser.findMany;
}
