import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType('GetProductsDto')
export class GetProductsDto {
  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: Boolean
}