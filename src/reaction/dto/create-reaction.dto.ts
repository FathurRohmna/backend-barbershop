import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReactionDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsString()
  commented: string;

  @IsString()
  @IsNotEmpty()
  booking_id: string;
}
