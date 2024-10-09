import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CreateAppointmentDto {

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date_time: Date

    @IsNotEmpty()
    @IsNumber()
    nail_service_id: number
}