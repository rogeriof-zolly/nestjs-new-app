import { CategoryEnum } from "../enums/category.enum";

export interface Books {
  name: string;
  author: string;
  editor: string;
  edition: number;
  pages: number;
  collection: string;
  category: CategoryEnum;
}