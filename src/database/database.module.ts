import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'user',
    entities: [UserSchema],
    synchronize: true
  })]
})
export class DatabaseModule {}
