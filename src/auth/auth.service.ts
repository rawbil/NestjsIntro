import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(data: AuthPayloadDto) {
    const findUser = await this.prisma.users.findUnique({
      where: { email: data.email as string },
    });
    if (!findUser) throw new HttpException('User not found', 404);
  }
}
