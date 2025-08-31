import { Controller, Post, Body, HttpCode, Res, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeConfig, StripeConfigName } from 'src/configs/stripe.config';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private configService: ConfigService
  ) { }

  @Post('checkout')
  async createCheckout(@Body() body: { amount: number; currency: string }) {
    return this.stripeService.createCheckoutSession(body.amount, body.currency);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const stripeConfig =
      this.configService.getOrThrow<StripeConfig>(StripeConfigName);

    const sig = req.headers['stripe-signature'];
    const stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2025-08-27.basil',
    });

    try {
      const event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig,
        stripeConfig.webhookSecret,
      );

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Payment success:', session);
      }

      res.json({
        received: true
      });
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}