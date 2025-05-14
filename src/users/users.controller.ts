import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  //GET /users
  @Get()
  findAll() {
    return 'All users have been found!!';
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
}
