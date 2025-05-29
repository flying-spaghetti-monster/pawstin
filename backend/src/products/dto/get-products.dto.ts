import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

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
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: Boolean
}