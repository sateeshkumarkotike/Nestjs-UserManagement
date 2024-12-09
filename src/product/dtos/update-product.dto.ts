
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'title is required' })
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'category is required' })
  @IsOptional()
  category: string;

  @IsNotEmpty({ message: 'brand is required' })
  @IsString()
  @IsOptional()
  brand: string;

  @IsNotEmpty({ message: 'price is required' })
  @IsString()
  @IsOptional()
  price: number;

  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  @IsOptional()
  description: string;

  // You can make inStock optional as it's not always provided
  @IsString()
  @IsOptional()
  inStock?: boolean;

  images: any; // Use the custom type here
}
