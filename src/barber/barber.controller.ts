import { Controller, Get } from '@nestjs/common';
import { BarberService } from './barber.service';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('barber')
@ApiTags('Barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Get('/barbers-haircut')
  @ApiOkResponse({
    description: 'Get Shop Data',
  })
  async getAllBarbersData() {
    const barbers = await this.barberService.getBarberData();
    const haircut = await this.barberService.getHaircutData();

    return { barbers, haircut };
  }
}
