import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { IUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {} //create an instance of the object
    @Get() //GET /users
    findAll() {
       return this.usersService.findAll();
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() //POST /users
    create(@Body() newUser: IUser) {
       return this.usersService.create(newUser);
    }

    @Patch(":id") //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: IUser) {
         return this.usersService.update(id, updatedUser)
    }

    @Delete(':id') //DELETE /users/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id)
    }
}
