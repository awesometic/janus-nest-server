import { Test, TestingModule } from '@nestjs/testing';
import { EntrancesController } from './entrances.controller';
import { EntrancesService } from './entrances.service';

describe('EntrancesController', () => {
  let controller: EntrancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrancesController],
      providers: [EntrancesService],
    }).compile();

    controller = module.get<EntrancesController>(EntrancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
