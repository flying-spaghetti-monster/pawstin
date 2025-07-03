import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('CreateProductDto')
export class CreateProductDto {
  @Field()
  @IsString()
  product_name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  slug: string;

  @Field()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discont_price?: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  picture?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
