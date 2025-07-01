import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  product_name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
