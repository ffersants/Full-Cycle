import { IsString, IsEmail } from "class-validator";

export default class CreateClientModelValidation {
    @IsString()
    id?: string;
  
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    address: string;
  }