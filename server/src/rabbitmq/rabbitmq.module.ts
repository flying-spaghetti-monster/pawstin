// rabbitmq.module.ts
import { Module, Global } from '@nestjs/common';
import { createRabbitMQChannel } from './rabbitmq';

@Global()
@Module({
  providers: [
    {
      provide: 'RABBITMQ_CHANNEL',
      useFactory: async () => {
        return await createRabbitMQChannel();
      },
    },
  ],
  exports: ['RABBITMQ_CHANNEL'],
})
export class RabbitMQModule { }