import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAddressDTO {

  @IsString()
  @IsNotEmpty({ message: 'DoorNoAndVillage is required' })
  @IsOptional()
  doorNoAndVillage: string;

  @IsString()
  @IsNotEmpty({ message: 'District is required' })
  @IsOptional()
  district: string;

  @IsString()
  @IsNotEmpty({ message: 'State is required' })
  @IsOptional()
  state: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Pincode is required' })
  @IsOptional()
  pincode: number;

  @IsString()
  @IsNotEmpty({ message: 'Landmark is required' })
  @IsOptional()
  landmark:string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  @IsOptional()
  country:string;
}