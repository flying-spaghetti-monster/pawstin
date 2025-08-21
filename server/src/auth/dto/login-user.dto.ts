import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType('LoginUserDto')
export class LoginUserDto {
  @ApiProperty()
  @Field()
  @IsString()
  email: string

  @ApiProperty()
  @Field()
  @IsString()
  password: string

  @ApiProperty()
  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  remember_me?: boolean
}
