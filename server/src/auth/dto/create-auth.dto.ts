import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Roles } from '@prisma/client';


export class CreateAuthDto {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsOptional()
  @IsEnum(Roles, { message: 'role must be a valid enum value (USER, ADMIN) : if empty user by default' })
  role?: Roles;
}
