import { registerAs } from '@nestjs/config';

export const StripeConfigName = 'stripe';

export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
}

export default registerAs(StripeConfigName, () => ({
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
}));
