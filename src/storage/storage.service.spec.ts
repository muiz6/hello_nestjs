import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

jest.mock('src/config');
jest.mock('mime-types');
jest.mock('fs/promises');

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should return file name', () => {
    expect(
      service.createStoredFile(Buffer.from('123'), '.png'),
    ).resolves.toBeDefined();
  });

  it('get stored file object', async () => {
    const result = await service.getStoredFile('name.png');
    expect(result).toHaveProperty('mimeType');
    expect(result).toHaveProperty('data');
  });

  it('should resolve as undefined', () => {
    expect(service.deleteStoredFile('name.png')).resolves.toBeUndefined();
  });
});
