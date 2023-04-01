import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { User } from './interfaces/users.interface';
import { UserSchema } from './schemas/users.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserEntity>,
  ){} 

  async createUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}
