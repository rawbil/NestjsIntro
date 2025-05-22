import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class AuthPayloadDto {
    @IsString()
    @IsNotEmpty()
    username: String;

    @IsStrongPassword()
    password: String;

    @IsEmail()
    email: String
}