/* eslint-disable prettier/prettier */
import { PrismaRepository } from './../app_module/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  findUnique = this.prisma.booking.findUnique;
  findMany = this.prisma.booking.findMany;
  create = this.prisma.booking.create;
  update = this.prisma.booking.update;
}
