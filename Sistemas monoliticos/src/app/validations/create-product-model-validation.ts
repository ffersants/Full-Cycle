import { IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateProductModelValidation {
    @IsOptional()
    @IsString()
    id?: string;
  
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsNumber()
    purchasePrice: number;
  
    @IsNumber()
    stock: number;
  }