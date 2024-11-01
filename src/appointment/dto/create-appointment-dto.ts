import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  start: number;

  @IsNumber()
  end: number;

  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  nail_service_id: number;
}
