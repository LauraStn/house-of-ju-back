import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsString()
  start: string;

  @IsNotEmpty()
  @IsString()
  end: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  nail_service_id: number;
}
