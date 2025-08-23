// rabbitmq.ts
import * as amqp from 'amqplib';

export async function createRabbitMQChannel() {
  const connection = await amqp.connect('amqp://guest:guest@localhost:5672/');
  const channel = await connection.createChannel();
  await channel.assertQueue('emailQueue', { durable: true });

  console.log('RabbitMQ connected');
  return channel;
}