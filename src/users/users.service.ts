import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput) {
    const findEmail = await this.prisma.users.findUnique({ where: { email: data.email } });
    if(findEmail) throw new HttpException("email already exists", 400    )
    return await this.prisma.users.create({data});
  }

  async updateUser(id: number, data: Prisma.UsersUpdateInput) {
    const findUser = await this.prisma.users.findUnique({where: {id}})
    if(!findUser) throw new HttpException(`User with id: ${id} not found`, 404);
    if(data.email) {
      const findEmail = await this.prisma.users.findUnique({where: {email: data.email as string}});
    if(findEmail) throw new HttpException("Email already exists", 400);
    }
    

    return this.prisma.users.update({where: {id}, data});
  }

  async findUserById(id: number) {
    const user = await this.prisma.users.findUnique({where: {id}});
    if(!user) throw new HttpException(`User with id: ${id} not found`, 404);
    return user;
  }

  async findAllUsers() {
    const allUsers = await this.prisma.users.findMany();
    return allUsers
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if(!user) throw new HttpException("User to delete not found", 404);
    await this.prisma.users.delete({where: {id}});
    return this.findAllUsers();
  }

 /*  private users = [
    {
      id: 1,
      name: 'Bildad',
      email: 'bildadsimiyu6@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Simiyu',
      email: 'simiyu@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Roy',
      email: 'itsprime@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Wafula',
      email: 'wamunyinyi@gmail.com',
      role: 'INTERN',
    },
  ];
  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const foundRoles = this.users.filter((user) => user.role === role);
      if(foundRoles.length === 0) {
        throw new NotFoundException("Invalid role")
      }
      else {
        return foundRoles;
      }
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if(!user) {
        throw new NotFoundException(`User with id: ${id} not found`)
    }
    return user;
  }

  create(user: CreateUserDto) {
    const id =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    const newUser = { id, ...user };
    const updatedUsers = [...this.users, newUser];
    return updatedUsers;
  }

  update(id: number, body: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        const newUser = { ...user, ...body };
        return newUser;
      } else {
        return user;
      }
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const findUser = this.users.find(user => user.id === id);
    if(!findUser) {
        throw new NotFoundException(`User with id: ${id} not found`)
    }
    this.users = this.users.filter(user => user.id !== id);
    return findUser;
  } */
}
