import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category_name: string

  @IsString()
  description: string

  @IsString()
  slug: string

  @IsString()
  @IsOptional()
  picture?: string

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean
}
