import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}