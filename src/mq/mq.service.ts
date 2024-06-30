import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import config from 'src/config';

@Injectable()
export class MqService {
  async createMessage() {
    try {
      const connection = await amqp.connect(config.RABBITMQ_CONSTR);
      const channel = await connection.createChannel();

      const queue = 'my_queue_name';
      const message = 'This is a test message';

      await channel.sendToQueue(queue, Buffer.from(message));

      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
