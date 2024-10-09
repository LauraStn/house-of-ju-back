import { IsNotEmpty,  IsNumber,  IsString } from "class-validator"

  export class NailServiceDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    duration: number

    @IsNotEmpty()
    @IsNumber()
    price: number
  }