import { Test, TestingModule } from '@nestjs/testing';
import { HomestaysController } from './homestays.controller';
import { HomestaysService } from './homestays.service';

describe('HomestaysController', () => {
  let controller: HomestaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomestaysController],
      providers: [HomestaysService],
    }).compile();

    controller = module.get<HomestaysController>(HomestaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
