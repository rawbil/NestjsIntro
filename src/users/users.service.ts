import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
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
      return this.users.filter((user) => user.role === role);
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
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
    this.users = this.users.filter(user => user.id !== id);
    return findUser;
  }
}
