import { Test, TestingModule } from '@nestjs/testing';
import { UserPersoneServiseService } from './user-person.service';

describe('UserPersoneServiseService', () => {
  let service: UserPersoneServiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPersoneServiseService],
    }).compile();

    service = module.get<UserPersoneServiseService>(UserPersoneServiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
