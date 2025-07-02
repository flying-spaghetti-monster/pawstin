import { IsString, IsOptional, IsEnum, Matches, IsEmail } from 'class-validator';
import { Roles } from '@prisma/client';


export class CreateAuthDto {
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'email must be a valid email address'
  })
  @IsEmail()
  email: string

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'password must be at least 8 characters long and contain at least one letter and one number'
  })
  password: string

  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsOptional()
  @IsEnum(Roles, { message: 'role must be a valid enum value (USER, ADMIN) : if empty user by default' })
  role?: Roles;
}
