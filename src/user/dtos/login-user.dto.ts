import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}