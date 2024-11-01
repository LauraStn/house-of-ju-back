import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;
}