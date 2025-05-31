import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //find all users
  async findAllUsers() {
    return await this.prisma.users.findMany();
  }

  //find user by id
  async findUserById(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //create new user
  async createUser(data: Prisma.UsersCreateInput) {
    const newUser = await this.prisma.users.create({ data });
    //check if email already exists
    const checkEmail = await this.prisma.users.findUnique({
      where: { email: data.email as string },
    });
    if (checkEmail) return new ConflictException('Email already exists');
    return newUser;
  }

  //update user
  async updateUserById(id: number, data: Prisma.UsersUpdateInput) {
    const user = await this.prisma.users.update({
      where: { id },
      data: data,
    });
    if (!user) throw new NotFoundException('User to update not found');

    if (data.email) {
      //check if updated email already exists
      const checkEmail = await this.prisma.users.findUnique({
        where: { email: data.email as string },
      });
      if (checkEmail) return new ConflictException('Email already exists'); 
    }
    return user;
  }

  //delete user
  async deleteUser(id: number) {
    await this.findUserById(id);
    return await this.prisma.users.delete({where: {id}});
  }
}
