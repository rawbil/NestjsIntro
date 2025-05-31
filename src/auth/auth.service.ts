import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private usersService: UsersService) {}

    //register
    async register() {

    }

    //login
    async login() {

    }

}
