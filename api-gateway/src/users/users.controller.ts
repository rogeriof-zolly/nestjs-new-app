import { Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { Body, Delete, Get, Param, Patch, Put, Query } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from './dtos/users.dto';
import { Observable } from 'rxjs';
import { User } from './interfaces/users.interface';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true
      }
    }
  })

  client: ClientKafka

  async onModuleInit(){
    const requestPatterns = [
      'create-user',
      'find-all-users',
      'update-user',
      'remove-user'
    ];

    requestPatterns.forEach( async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    })
  }

  @Post()
  @ApiBody({ type: UserDto })
  createUser(@Body() user: UserDto): Observable<User> {
    return this.client.send('create-user', user);
  }

  @Get()
  allUsers(): Observable<User[]> {
    return this.client.send('find-all-users', {});
  }

  @Put(':id')
  @ApiBody({ type: UserDto })
  updateUser(@Param('id') id: number,  @Body() user:UserDto): Observable<User> {

    const payload = {
      id,
      user
    }

    return this.client.send('update-user', payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Observable<void> {
    return this.client.send('remove-user', { id });
  }

  @Patch(':id/activate')
  activateUser(@Param('id') id: number): Observable<void> {
    return this.client.emit('activate-user', { id });
  }

  @Patch(':id/inactivate')
  inactivateUser(@Param('id') id: number): Observable<void> {
    return this.client.emit('inactivate-user', { id });
  }
}
