import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

jest.mock('axios', () => ({
  get: () => ({
    data: {
      data: {},
    },
  }),
}));

const mockUserModel = Object.assign(
  jest.fn(() => ({
    save: jest.fn(),
  })),
  {
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  },
);

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service.getUserById('1')).toBeDefined();
  });

  it('should get user but return undefined', () => {
    expect(service.getUserRecordById('1')).resolves.toBeUndefined();
  });

  it('should create user and return undefined', () => {
    expect(service.createUserRecord({})).resolves.toBeUndefined();
  });

  it('should delete user record and return undefined', () => {
    expect(service.deleteUserRecord('1')).resolves.toBeUndefined();
  });
});
