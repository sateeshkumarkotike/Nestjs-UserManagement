import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  image: any;

  role:any;
}