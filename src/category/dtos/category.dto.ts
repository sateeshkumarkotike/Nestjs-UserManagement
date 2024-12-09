import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  @MinLength(2, { message: 'Category must be at least 2 characters long' })
  name: string;
}