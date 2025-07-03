import { IsString, IsOptional, IsEnum, Matches, IsEmail } from 'class-validator';
import { Roles } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateUserDto')
export class CreateUserDto {
  @Field()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'email must be a valid email address'
  })
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'password must be at least 8 characters long and contain at least one letter and one number'
  })
  password: string

  @Field()
  @IsString()
  first_name: string

  @Field()
  @IsString()
  last_name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(Roles, { message: 'role must be a valid enum value (USER, ADMIN) : if empty user by default' })
  role?: Roles;
}
