import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class GetProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: Boolean
}