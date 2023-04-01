import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

}