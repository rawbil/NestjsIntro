import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser) {
      throw new HttpException('User with this email already exists', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user
    const user = await this.prisma.users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
    };
//return statement
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
      }
    };
  }

  async login(data: AuthPayloadDto) {
    const findUser = await this.prisma.users.findUnique({
      where: { email: data.email as string },
    });
    if (!findUser) throw new HttpException('User not found', 404);

    // Compare the provided password with the user's password after fetching by email
    const isPasswordValid = await bcrypt.compare(data.password as string, findUser.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 401);
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: findUser.id,
        email: findUser.email,
      }
    };
}
}