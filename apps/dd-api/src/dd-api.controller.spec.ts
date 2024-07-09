import { Test, TestingModule } from '@nestjs/testing';
import { DdApiController } from './dd-api.controller';
import { DdApiService } from './dd-api.service';

describe('DdApiController', () => {
  let ddApiController: DdApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DdApiController],
      providers: [DdApiService],
    }).compile();

    ddApiController = app.get<DdApiController>(DdApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ddApiController.getHello()).toBe('Hello World!');
    });
  });
});
