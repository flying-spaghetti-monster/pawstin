import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateShipperDto {
  @IsString()
  company_name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
