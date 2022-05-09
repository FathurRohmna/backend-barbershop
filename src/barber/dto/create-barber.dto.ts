/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarber {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;
}
