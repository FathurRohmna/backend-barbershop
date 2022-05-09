import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';

@Module({
  imports: [AuthModule],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
})
export class BookingModule {}
