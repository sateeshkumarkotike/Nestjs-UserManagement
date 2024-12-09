import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class AddAddressDTO {

  @IsString()
  @IsNotEmpty({ message: 'DoorNoAndVillage is required' })
  @MinLength(6, { message: 'DoorNoAndVillage must be at least 6 characters long' })
  doorNoAndVillage: string;

  @IsString()
  @IsNotEmpty({ message: 'District is required' })
  district: string;

  @IsString()
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Pincode is required' })
  pincode: number;

  @IsString()
  @IsNotEmpty({ message: 'Landmark is required' })
  landmark:string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  @IsOptional()
  country:string;
}