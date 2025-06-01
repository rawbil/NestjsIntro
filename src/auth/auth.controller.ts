import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} //inject AuthService

    @Post('register') //POST /auth/register
    //@UseGuards(JwtAuthGuard)
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login') //POST /auth/login
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


}
