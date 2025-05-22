import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create-user') //POST /users/create-user
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Patch('update-user/:id') //PATCH //users/update-user/:id
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto)
    } 

    @Get('all-users') //GET /users/all-users
    findAllUsers() {
        return this.usersService.findAllUsers()
    } 

    @Get(':id') //GET /users/:id
    findUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @Delete('delete-user/:id') //DELETE /users/delete-user/:id
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
/*     
    @Get() //GET /users
    findAll(@Query('role', ValidationPipe) role?: 'INTERN' |'ADMIN' | 'ENGINEER') {
        return this.usersService.findAll(role);
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) newUser: CreateUserDto) {
        return this.usersService.create(newUser);
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
        return this.usersService.update(id, updatedUser)
    }

    @Delete(':id') //DELETE /users/:id
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    } */
}
