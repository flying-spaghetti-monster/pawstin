import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  product_name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discont_price?: number;

  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
