import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {} //create an instance of the object
    @Get() //GET /users
    findAll() {
       return this.usersService.findAll();
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post() //POST /users
    create(@Body() newUser: IUser) {
       return this.usersService.create(newUser);
    }

    @Patch(":id") //PATCH /users/:id
    update(@Param('id') id: string, @Body() updatedUser: IUser) {
         return this.usersService.update(id, updatedUser)
    }

    @Delete(':id') //DELETE /users/:id
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
