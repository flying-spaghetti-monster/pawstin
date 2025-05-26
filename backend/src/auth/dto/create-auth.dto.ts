import { IsString, IsOptional, IsEnum } from 'class-validator';
// import { Users } from '../../../prisma/client';
import { Roles } from '@prisma/client';

export class CreateAuthDto {
  @IsString()
  email;

  @IsString()
  password;

  @IsString()
  first_name;

  @IsString()
  last_name;

  @IsEnum(Roles, { message: 'role must be a valid enum value (USER, ADMIN) : if empty user by default' })
  @IsOptional()
  role?: Roles;
}
