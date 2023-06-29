import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './my-crud.service';
import { DataType } from 'src/interfaces/dto/data.interface';

describe('MyCrudService', () => {
  let service: AppService<DataType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService<DataType>>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
