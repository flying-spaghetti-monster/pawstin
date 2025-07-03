import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator'

@InputType('GetShippersDto')
export class GetShippersDto {
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
}