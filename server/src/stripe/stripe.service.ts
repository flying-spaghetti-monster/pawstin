import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeConfig, StripeConfigName } from 'src/configs/stripe.config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeConfig = this.configService.getOrThrow<StripeConfig>(StripeConfigName);

    this.stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createCheckoutSession(amount: number, currency: string) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Test product',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
  }
}
