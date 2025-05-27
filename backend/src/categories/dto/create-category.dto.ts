import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category_name;

  @IsString()
  description;

  @IsString()
  slug;

  @IsString()
  @IsOptional()
  picture?;

  @IsBoolean()
  @IsOptional()
  isActive?;
}
