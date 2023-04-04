import { ApiProperty } from "@nestjs/swagger";
import { CategoryEnum } from "../enums/category.enum";
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class BooksDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  editor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  edition: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  collection: string;

  @ApiProperty()
  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  category: CategoryEnum;
}