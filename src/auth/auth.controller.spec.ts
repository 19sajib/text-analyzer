import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a success message and token when credentials are valid', async () => {
      const mockUser = { username: 'testuser', _id: 'userId123' };
      const mockToken = { access_token: 'mockJwtToken' };
      const authDTO: AuthDTO = { username: 'testuser', password: 'testpassword' };

      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockToken);

      const result = await authController.login(authDTO, {});

      expect(result).toEqual({
        success: true,
        message: 'Login successful',
        token: mockToken,
      });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(authDTO.username, authDTO.password);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should return an error message when credentials are invalid', async () => {
      const authDTO: AuthDTO = { username: 'testuser', password: 'wrongpassword' };

      mockAuthService.validateUser.mockResolvedValue(null);

      const result = await authController.login(authDTO, {});

      expect(result).toEqual({
        success: false,
        message: 'Invalid credentials',
      });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(authDTO.username, authDTO.password);
    });
  });

  describe('register', () => {
    it('should return a success message and token when registration is successful', async () => {
      const mockToken = { access_token: 'mockJwtToken' };
      const authDTO: AuthDTO = { username: 'newuser', password: 'newpassword' };

      mockAuthService.register.mockResolvedValue(mockToken);

      const result = await authController.register(authDTO, {});

      expect(result).toEqual({
        success: true,
        message: 'Registration successful',
        token: mockToken,
      });
      expect(mockAuthService.register).toHaveBeenCalledWith(authDTO.username, authDTO.password);
    });

    it('should handle errors during registration', async () => {
      const authDTO: AuthDTO = { username: 'existinguser', password: 'password' };

      mockAuthService.register.mockRejectedValue(new Error('User already exists'));

      try {
        await authController.register(authDTO, {});
      } catch (err) {
        expect(err.message).toEqual('User already exists');
        expect(mockAuthService.register).toHaveBeenCalledWith(authDTO.username, authDTO.password);
      }
    });
  });
});
