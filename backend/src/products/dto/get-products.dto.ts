import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator'

export class GetProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;
}