import { EntitySchema } from "typeorm";
import { UserEntity } from "../entities/users.entity";


export const UserSchema = new EntitySchema<UserEntity>({
  name: 'User',
  target: UserEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      unique: true
    }
  }
})