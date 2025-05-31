import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { comparePassword } from './utils/password';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly  prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  //register
  async register() {}

  //login
  async login(loginDto: LoginDto) {
    //check if user with provided email exists
    const user = await this.prisma.users.findUnique({where: {email: loginDto.email}});
    //throw not found error if email not found
    if(!user) throw new HttpException(`${loginDto.email} not found`, 404);

    //compare password
    //await bcrypt.compare(loginDto.password, user.password);
    const pwMatches = comparePassword(loginDto.password, user.password);
    if(!pwMatches) {
        throw new HttpException("Invalid credentials", 400);
    }

    //sign token after successful login
    return this.signToken(user.id, loginDto.email)
    
  }

  //Token generation logic
  async signToken(userId: number, email: string) {
    const payload = {userId, email};

    const secret = this.config.get<string>('JWT_SECRET');

    //sign token
    const token = await this.jwt.signAsync(payload, {
        secret,
        expiresIn: '1h'
    });

    //returns the token
    return {
        message: "Login Successful!!",
        access_token: token,
    }

  }
}
