import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('find-all') //GET /users/find-all
    findAllUsers() {
        return this.usersService.findAllUsers()
    }

    @Get(':id') //GET /users/:id
    findUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @Post('create-user') //POST /users/create-user
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch('update/:id') //PATCH /users/update/:id
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateUserById(id, updateUserDto);
    }

    @Delete('delete/:id') //DELETE /users/delete/:id
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
