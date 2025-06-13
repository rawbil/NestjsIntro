import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  //!register
  async register(registerDto: RegisterDto) {
    //check if email exists
    const userExists = await this.prisma.users.findUnique({
      where: { email: registerDto.email },
    });
    if (userExists) throw new UnauthorizedException('Email already exists');

    //hash password
    const hashedPassword = await hashPassword(registerDto.password);

    //create user
    const newUser = await this.prisma.users.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        username: registerDto.username,
      },
    });

    return {
      success: true,
      message: 'User created successfully',
      newUser,
    };
  }

  //!login
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

  //!Token generation logic
  async signToken(userId: number, email: string) {
    const payload = { userId, email };

    const secret = this.config.get<string>('JWT_SECRET');

    //sign access token
    const access_token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '1h',
    });

    //sign refresh token
    const refresh_token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '7d',
    });

    //we need to store the refresh token in the users model in DB
    //first, hash the token for security
    const hashedRefreshToken = await hashPassword(refresh_token);
    await this.prisma.users.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });

    //returns the token
    return {
      success: true,
      message: 'Login Successful!!',
      access_token,
      refresh_token,
    };
  }

  //!use refresh token to create a new access token
  async refreshAccessToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refresh_token } = refreshTokenDto;
      //throw error if refresh token is not available
      if (!refresh_token) {
        throw new UnauthorizedException('Refresh token is required');
      }

      //Verify the refrehs token against the secret and get back the payload, which includes userId and email

      const secret = this.config.get<string>('JWT_SECRET');
      const payload = await this.jwt.verifyAsync(refresh_token, { secret });

      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      //find user with the payload id
      const user = await this.prisma.users.findUnique({
        where: { id: payload.userId },
      });
      if (!user) {
        throw new NotFoundException('User not found. Login again');
      }

      //compare incoming refresh token with the one stored in the database
      const compareRefreshToken = await comparePassword(
        refresh_token,
        user.refreshToken as string,
      );
      if (!compareRefreshToken) {
        throw new UnauthorizedException('Refresh token mismatch');
      }

      //?invalidate the refreshtoken by deleting it from the database
     //await this.prisma.users.update({where: {id: payload.userId}, data: {refreshToken: null}})
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  //!logout
  async logout(userId: number) {
    await this.prisma.users.update({where: {id: userId}, data: {refreshToken: null}});
    return {
      success: true,
      message: "Logged out successfully"
    }
  }
}
