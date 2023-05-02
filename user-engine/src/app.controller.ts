import { Controller, Get, Logger, OnModuleInit, UseFilters } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './interfaces/users.interface';
import { UserEntity } from './interfaces/users.entity';
import { UpdateResult } from 'typeorm';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService){}

  private readonly logger = new Logger(AppController.name)

  @MessagePattern('find-all-users')
  async findAllUsers(): Promise<User[]> {
    return this.appService.getAllUsers();
  }

  @MessagePattern('create-user')
  create(@Payload() data: UserEntity): Promise<UserEntity>{
    this.logger.log('User data:', JSON.stringify(data))

    return this.appService.createUser(data)
  }

  @MessagePattern('update-user')
  update(@Payload() data: any): void{
    this.logger.log('New user data: ', JSON.stringify(data));

    this.appService.updateUser(data.id, data.user);
  }

  @MessagePattern('remove-user')
  remove(@Payload() data:any): any{
    this.logger.log('User to delete: ', JSON.stringify(data));

    this.appService.removeUser(data.id);
  }

  @MessagePattern('activate-user')
  activate(@Payload() data:any): any {
    this.logger.log('Activating user: ', data.id);

    this.appService.activateUser(data.id);
  }

  @MessagePattern('inactivate-user')
  inactivate(@Payload() data:any): any {
    this.logger.log('Inactivating user: ', data.id);

    this.appService.inactivateUser(data.id);
  }
}
