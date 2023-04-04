import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../enums/category.enum";

@Entity()
export class BooksEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  editor: string;

  @Column()
  edition: number;

  @Column()
  pages: number;

  @Column()
  collection: string;
  
  @Column({
    type: 'enum',
    enum: CategoryEnum
  })
  category: CategoryEnum;
}