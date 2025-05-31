import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from './utils/password';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  //register
  async register(registerDto: RegisterDto) {
    //check if email exists
    const userExists = await this.prisma.users.findUnique({where: {email: registerDto.email}});
    if(userExists) throw new UnauthorizedException("Email already exists");

    //hash password
    const hashedPassword = await hashPassword(registerDto.password);

    //create user
    const newUser = await this.prisma.users.create({data: {
      email: registerDto.email,
      password: hashedPassword,
      username: registerDto.username,
    }});

    return {
      success: true,
      message: "User created successfully",
      newUser
    }
  }

  //login
  async login(loginDto: LoginDto) {
    //check if user with provided email exists
    const user = await this.prisma.users.findUnique({
      where: { email: loginDto.email },
    });
    //throw not found error if email not found
    if (!user) throw new HttpException(`${loginDto.email} not found`, 404);

    //compare password
    //await bcrypt.compare(loginDto.password, user.password);
    const pwMatches = await comparePassword(loginDto.password, user.password);
    if (!pwMatches) {
      throw new HttpException('Invalid credentials', 400);
    }

    //sign token after successful login
    return this.signToken(user.id, loginDto.email);
  }

  //Token generation logic
  async signToken(userId: number, email: string) {
    const payload = { userId, email };

    const secret = this.config.get<string>('JWT_SECRET');

    //sign token
    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '1h',
    });

    //returns the token
    return {
      success: true,
      message: 'Login Successful!!',
      access_token: token,
    };
  }
}
