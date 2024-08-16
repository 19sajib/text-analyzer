import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockJwtToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'), // Pass the model name as a string
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken('User'));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user data without password if credentials are valid', async () => {
      const mockUser = {
        username: 'test_user',
        password: 'test_password',
        _id: 'userId123',
      };
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await authService.validateUser('test_user', 'test_password');

      expect(result).toEqual({
        username: 'test_user',
        _id: 'userId123',
      });
    });

    it('should throw an error if the user is not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(authService.validateUser('non_existing_user', 'password')).rejects.toThrow(
        new HttpException('No user found with this username...', HttpStatus.FORBIDDEN),
      );
    });

    it('should throw an error if the password is incorrect', async () => {
      const mockUser = {
        username: 'test_user',
        password: 'wrong_password',
      };
      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(authService.validateUser('test_user', 'test_password')).rejects.toThrow(
        new HttpException('Invalid credentials...', HttpStatus.FORBIDDEN),
      );
    });
  });

  describe('login', () => {
    it('should return an access token for valid user data', async () => {
      const mockUser = {
        username: 'test_user',
        _id: 'userId123',
      };

      const result = await authService.login(mockUser);

      expect(result).toEqual({
        access_token: 'mockJwtToken',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'test_user', sub: 'userId123' });
    });
  });

  describe('register', () => {
    it('should create a new user and return an access token', async () => {
      const mockUser = {
        username: 'new_user',
        password: 'new_password',
        _id: 'userId123',
      };
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue(mockUser);

      const result = await authService.register('new_user', 'new_password');

      expect(result).toEqual({
        access_token: 'mockJwtToken',
      });
      expect(mockUserModel.create).toHaveBeenCalledWith({
        username: 'new_user',
        password: 'new_password',
      });
    });

    it('should throw an error if the username is already taken', async () => {
      const mockExistingUser = {
        username: 'existing_user',
        password: 'password',
      };
      mockUserModel.findOne.mockResolvedValue(mockExistingUser);

      await expect(authService.register('existing_user', 'password')).rejects.toThrow(
        new HttpException('There is a register user with that username try login', HttpStatus.FORBIDDEN),
      );
    });
  });
});
