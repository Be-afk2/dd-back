import { Test, TestingModule } from '@nestjs/testing';
import { DdWebController } from './dd-web.controller';
import { DdWebService } from './dd-web.service';

describe('DdWebController', () => {
  let ddWebController: DdWebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DdWebController],
      providers: [DdWebService],
    }).compile();

    ddWebController = app.get<DdWebController>(DdWebController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ddWebController.getHello()).toBe('Hello World!');
    });
  });
});
