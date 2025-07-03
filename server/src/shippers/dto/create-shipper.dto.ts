import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType('CreateShipperDto')
export class CreateShipperDto {
  @Field()
  @IsString()
  company_name: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  address: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  picture?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
