import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  nail_service_id: number;
}
