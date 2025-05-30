import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    //find all users
    async findAllUsers() {
        return await this.prisma.users.findMany()
    }

    //find user by id
    async findUserById(id: number) {
        const user = await this.prisma.users.findUnique({where: {id}});
        if(!user) throw new NotFoundException("User not found");
        return user;
    }

    //create new user
    async createUser(data: Prisma.UsersCreateInput) {
        
    }

}
