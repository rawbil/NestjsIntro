import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} //inject AuthService

    @Post('register') //POST /auth/register
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login') //POST /auth/login
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


}
