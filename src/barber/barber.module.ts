import { HaircutRepository } from './haircut.repository';
import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { BarberRepository } from './baber.repository';

@Module({
  providers: [BarberService, BarberRepository, HaircutRepository],
  controllers: [BarberController],
})
export class BarberModule {}
