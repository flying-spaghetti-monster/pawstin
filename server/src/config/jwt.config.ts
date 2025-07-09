import { registerAs } from '@nestjs/config';

export const JwtConfigName = 'jwt';

export interface getJwtConfig {
  global: string;
  secret: number;
  signOptions: {
    expiresIn: string
  }
}

export default registerAs(JwtConfigName, () => ({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
}))
