import { Test, TestingModule } from '@nestjs/testing';
import { BeaconsController } from './beacons.controller';
import { BeaconsService } from './beacons.service';

describe('BeaconsController', () => {
  let controller: BeaconsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeaconsController],
      providers: [BeaconsService],
    }).compile();

    controller = module.get<BeaconsController>(BeaconsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
