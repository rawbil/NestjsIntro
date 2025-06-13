import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { RefreshTokenDto } from './dto/refresh_token.dto';
import { Request } from 'express';

interface RequestWithUser extends Request {
    user: {id: number, email: string}
}

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

    @Post('refresh-token') //POST /auth/refresh-token
    refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout') //POST /auth/logout
    logout(@Req() req: RequestWithUser) {
        const userId = req.user.id
        return this.authService.logout(userId)
    }
}
