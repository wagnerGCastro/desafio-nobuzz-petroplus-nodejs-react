import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe.skip('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it.skip('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
