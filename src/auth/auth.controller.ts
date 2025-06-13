import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}
    @Post('login') //POST /auth/login
    login(@Body() authPayloadDto: AuthPayloadDto) {
        return this.authService.login(authPayloadDto);
    }
}
