import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe.skip('AuthController', () => {
  let authControlle: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authControlle = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authControlle).toBeDefined();
  });
});
