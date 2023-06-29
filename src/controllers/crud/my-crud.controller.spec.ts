import { Test, TestingModule } from '@nestjs/testing';
import { MyCrudController } from './crud-user.controller';

describe('MyCrudController', () => {
  let controller: MyCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyCrudController],
    }).compile();

    controller = module.get<MyCrudController>(MyCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
