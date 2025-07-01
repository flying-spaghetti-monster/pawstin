import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  remember_me?: boolean
}
