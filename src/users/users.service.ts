import { Injectable } from '@nestjs/common';

export interface IUser {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'Bildad',
      email: 'bildadsimiyu6@gmail.com',
    },
    {
      id: '2',
      name: 'Simiyu',
      email: 'simiyu@gmail.com',
    },
    {
      id: '3',
      name: 'Chilli',
      email: 'hotchilli101@gmail.com',
    },
    {
      id: '4',
      name: 'mimi',
      email: 'nimimi@gmail.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const singleUser = this.users.find((user) => user.id === id);
    return singleUser;
  }

  create(body: IUser) {
    const id =
      this.users.length > 0 ? +this.users[this.users.length - 1].id.toString() + 1 : 1;
    const newUser = { id, ...body };
    const updatedUsers = [...this.users, newUser];
    return updatedUsers;
  }

  update(id: string, body: IUser) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...body };
      }
      return user;
    });
    return this.findOne(id);
  }

  remove(id: string) {
    const removedUser = this.users.find(user => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
