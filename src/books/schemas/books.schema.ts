import { EntitySchema } from "typeorm";
import { BooksEntity } from "../entities/books.entities";
import { CategoryEnum } from "../enums/category.enum";

export const BooksSchema = new EntitySchema<BooksEntity>({
    name: 'Books',
    target: BooksEntity,
    columns: {
      id: {
        type: Number,
        generated: true,
        primary: true
      },
      
      name: {
        type: String
      }, 
      
      author: {
        type: String
      },

      editor: {
        type: String
      },

      edition: {
        type: String
      },

      pages: {
        type: Number
      },

      category: {
        type: String
      }
    },
  }
)