import { Test, TestingModule } from '@nestjs/testing';
import { MqService } from './mq.service';

jest.mock('src/config');
jest.mock('amqplib', () => ({
  connect: () => ({
    createChannel: jest.fn(() => ({
      sendToQueue: jest.fn(),
      close: jest.fn(),
    })),
    close: jest.fn(),
  }),
}));

describe('MqService', () => {
  let service: MqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqService],
    }).compile();

    service = module.get<MqService>(MqService);
  });

  it('should resolve as undefined', () => {
    expect(service.createMessage()).resolves.toBeUndefined();
  });
});
