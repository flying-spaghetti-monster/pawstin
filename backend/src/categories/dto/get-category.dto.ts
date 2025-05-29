import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator'

export class GetCategoriesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;
}