import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, JwtModule.register({
    secret: "7dpQA5XAGR/sNgHxPo9AvSzLrHwwiGb4NgYwMLAp7TE=",
    signOptions: {expiresIn: '1h'}
  })]
})
export class AuthModule {}
