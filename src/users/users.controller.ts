import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  //GET /users or /users?role=value
  @Get()
  findAll(@Query('role') role?: 'INTERN' | "ADMIN") {
    return `All users have been found!! ${role ? `Their role is ${role}` : ""} `;
  }

  //GET /users/subscribed
  @Get('subscribed')
  findSubs() {
    return '50 users have subscribed';
  }

  //GET /users/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return `The userId is: ${id}`;
  }

  //GET /users/find:rank
  @Get("find/:rank")
  findRank(@Param('rank') rank: string) {
    return `find the user's rank, which in this case is: ${rank}`
  }

  //POST /users
  @Post()
  addUsers(@Body() user: {}) {
    return {user}
  }

  //PATCH /users/:id
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() singleUser: {}) {
    return {id, ...singleUser}
  }

  //DELETE /user/:id
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return {id}
  }
}
