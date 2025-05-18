import {IsEmail, IsString, IsNotEmpty, IsEnum} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN','ADMIN', 'ENGINEER'], {
        message: "Invalid role"
    })
    role: 'INTERN'| 'ADMIN' | 'ENGINEER';
}