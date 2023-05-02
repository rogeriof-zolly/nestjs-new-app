import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './interfaces/users.interface';
import { UserEntity } from './interfaces/users.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ){} 

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({where: { status: 'ACTIVATE' }});
  }

  async findUser(userId: number): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        id: userId
      }
    });

    if(!foundUser){
      throw new NotFoundException(`User with given id (${userId}) not found`);
    }

    return foundUser;
  }

  async updateUser(userId: number, newUserData: UserEntity): Promise<UpdateResult> {
    const foundUser = await this.findUser(userId);
    return this.usersRepository.update(foundUser.id, newUserData);
  }

  async removeUser(userId: number): Promise<any> {
    const found = await this.findUser(userId);

    await this.usersRepository.delete({ id: found.id })
  }

  async inactivateUser(userId: number): Promise<void> {
    const found = await this.findUser(userId);

    if(found?.status === 'INACTIVATE')
      throw new HttpException('User already inactivated', 401);

    found.status = 'INACTIVATE';
    this.usersRepository.update(found.id, found);
  }

  async activateUser(userId: number): Promise<void> {
    const found = await this.findUser(userId);

    if(found?.status === 'ACTIVATE')
      throw new BadRequestException('User already activated');

    found.status = 'ACTIVATE';
    this.usersRepository.update(found.id, found);
  }
}
