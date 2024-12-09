
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class AddProductDTO {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'category is required' })
  @IsString()
  category: string;

  @IsNotEmpty({ message: 'brand is required' })
  @IsString()
  brand: string;

  @IsNotEmpty({ message: 'price is required' })
  @IsString()
  price: number;

  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;

  // You can make inStock optional as it's not always provided
  @IsString()
  @IsOptional()
  inStock?: boolean;

  images: any; // Use the custom type here
}
