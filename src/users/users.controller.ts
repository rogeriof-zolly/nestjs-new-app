import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @ApiBody({ type: UserDto })
  async createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  async allUsers() {
    return this.usersService.getAllUsers();
  }
}
