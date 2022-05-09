/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  model_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  barber_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  payment_id: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  date_time: Date;
}
