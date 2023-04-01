import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import { User } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Get()
  async allUsers() {
    return this.usersService.getAllUsers();
  }
}
