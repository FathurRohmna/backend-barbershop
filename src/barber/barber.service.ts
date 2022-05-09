import { HaircutRepository } from './haircut.repository';
import { BarberRepository } from './baber.repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BarberService {
  constructor(
    private readonly repository: BarberRepository,
    private readonly haircutRepository: HaircutRepository,
  ) {}

  createBarber(barber: Prisma.BarberUserCreateInput) {
    return this.repository.create({
      data: barber,
    });
  }

  updateBarber(
    where: Prisma.BarberUserWhereUniqueInput,
    data: Prisma.BarberUserCreateInput,
  ) {
    return this.repository.update({ data, where });
  }

  async getBarberData() {
    return await this.repository.findMany({
      select: {
        ratingAverage: true,
        barberId: true,
        image: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getHaircutData() {
    return await this.haircutRepository.findMany({
      select: {
        name: true,
        haircutModelId: true,
        price: true,
        proccessTime: true,
      },
    });
  }
}
