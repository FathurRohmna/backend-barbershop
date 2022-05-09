import { CreateBookingDto } from './dto/create-booking.dto';
import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly repository: BookingRepository) {}

  async getCurrentBookingData(userId: string) {
    const booking = await this.repository.findMany({
      where: {
        userBookingId: userId,
        status: 'waiting',
      },
      select: {
        barberUser: {
          select: {
            ratingAverage: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return booking;
  }

  async getTimeAvailable(barberId, date) {
    const filter = await this.repository.findMany({
      where: {
        barberUserId: barberId,
        dateTime: {
          gte: new Date(date),
        },
      },
    });

    return filter;
  }

  createBooking({
    input,
    user,
  }: {
    input: CreateBookingDto;
    user: { userId: string };
  }) {
    const data: Prisma.BookingCreateInput = {
      model: {
        connect: {
          haircutModelId: input.model_id,
        },
      },
      user: {
        connect: {
          userId: user.userId,
        },
      },
      barberUser: {
        connect: {
          barberId: input.barber_id,
        },
      },
      payment: {
        connect: {
          paymentId: input.payment_id,
        },
      },
      dateTime: input.date_time,
      status: 'UNPAYMENT',
    };

    return this.repository.create({
      data,
      include: {
        model: true,
        user: true,
        barberUser: true,
        payment: true,
      },
    });
  }

  updateBooking(
    where: Prisma.BookingWhereUniqueInput,
    data: Prisma.BookingCreateInput,
  ) {
    return this.repository.update({ data, where });
  }
}
