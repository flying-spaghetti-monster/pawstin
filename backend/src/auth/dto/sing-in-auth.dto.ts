import { IsBoolean, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  email;

  @IsString()
  password;

  @IsBoolean()
  remember_me?;
}
