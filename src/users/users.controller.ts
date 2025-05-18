import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
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
    }
}
