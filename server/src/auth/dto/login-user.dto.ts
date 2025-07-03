import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType('LoginUserDto')
export class LoginUserDto {
  @Field()
  @IsString()
  email: string

  @Field()
  @IsString()
  password: string

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  remember_me?: boolean
}
