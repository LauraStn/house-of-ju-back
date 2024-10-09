import { IsNotEmpty,  IsNumber,  IsString } from "class-validator"

  export class ImageGalleryDto {

    @IsNotEmpty()
    @IsString()
    image_url: string
  }