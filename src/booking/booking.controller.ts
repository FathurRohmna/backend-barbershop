import { CreateBookingDto } from './dto/create-booking.dto';
import { ValidationPipe } from './../auth/pipes/validation.pipe';
import { JwtAuthGuard } from './../app_module/auth-guard/auth.guard';
import { BookingService } from './booking.service';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Body,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/current-book')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get Current book',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getCurrentBook(@Request() req) {
    const userId = req.user.userId;

    return this.bookingService.getCurrentBookingData(userId);
  }

  @Get('/available/:barberId/:date')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get Available slot',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAvailableDate(@Param('barberId') barberId, @Param('date') date) {
    const filter = await this.bookingService.getTimeAvailable(barberId, date);

    return filter;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/booking')
  @ApiBadRequestResponse({
    description: 'make sure all field are filled and valid',
  })
  @ApiCreatedResponse({
    description: 'Post Successfully created',
  })
  @ApiOkResponse({
    description: 'New Post Data',
  })
  async booking(
    @Body(new ValidationPipe()) createBooking: CreateBookingDto,
    @Request() req,
  ) {
    const userId = req.user.userId;

    return this.bookingService.createBooking({
      input: createBooking,
      user: { userId: userId },
    });
  }
}
