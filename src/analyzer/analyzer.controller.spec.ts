import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

describe('AnalyzerController', () => {
  let analyzerController: AnalyzerController;
  let analyzerService: AnalyzerService;

  const mockAnalyzerService = {
    wordCounts: jest.fn(),
    characterCounts: jest.fn(),
    sentenceCounts: jest.fn(),
    paragraphCounts: jest.fn(),
    getLongestWord: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyzerController],
      providers: [
        {
          provide: AnalyzerService,
          useValue: mockAnalyzerService,
        },
        {
          provide: APP_GUARD,
          useValue: mockJwtAuthGuard,
        },
      ],
    }).overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    analyzerController = module.get<AnalyzerController>(AnalyzerController);
    analyzerService = module.get<AnalyzerService>(AnalyzerService);
  });

  it('should be defined', () => {
    expect(analyzerController).toBeDefined();
  });

  describe('wordCounts', () => {
    it('should return the correct word count', async () => {
      const mockResult = 5;
      mockAnalyzerService.wordCounts.mockResolvedValue(mockResult);

      const result = await analyzerController.wordCounts('This is a test sentence.');
      expect(result).toBe(mockResult);
      expect(mockAnalyzerService.wordCounts).toHaveBeenCalledWith('This is a test sentence.');
    });
  });

  describe('characterCounts', () => {
    it('should return the correct character count', async () => {
      const mockResult = 24;
      mockAnalyzerService.characterCounts.mockResolvedValue(mockResult);

      const result = await analyzerController.characterCounts('This is a test sentence.');
      expect(result).toBe(mockResult);
      expect(mockAnalyzerService.characterCounts).toHaveBeenCalledWith('This is a test sentence.');
    });
  });

  describe('sentenceCounts', () => {
    it('should return the correct sentence count', async () => {
      const mockResult = 2;
      mockAnalyzerService.sentenceCounts.mockResolvedValue(mockResult);

      const result = await analyzerController.sentenceCounts('This is the first sentence. And this is the second!');
      expect(result).toBe(mockResult);
      expect(mockAnalyzerService.sentenceCounts).toHaveBeenCalledWith('This is the first sentence. And this is the second!');
    });
  });

  describe('paragraphCounts', () => {
    it('should return the correct paragraph count', async () => {
      const mockResult = 2;
      mockAnalyzerService.paragraphCounts.mockResolvedValue(mockResult);

      const result = await analyzerController.paragraphCounts('This is the first paragraph.\n\nThis is the second paragraph.');
      expect(result).toBe(mockResult);
      expect(mockAnalyzerService.paragraphCounts).toHaveBeenCalledWith('This is the first paragraph.\n\nThis is the second paragraph.');
    });
  });

  describe('getLongestWord', () => {
    it('should return the longest word(s)', async () => {
      const mockResult = ['jumped'];
      mockAnalyzerService.getLongestWord.mockResolvedValue(mockResult);

      const result = await analyzerController.getLongestWord('The quick brown fox jumped over the lazy dog.');
      expect(result).toEqual(mockResult);
      expect(mockAnalyzerService.getLongestWord).toHaveBeenCalledWith('The quick brown fox jumped over the lazy dog.');
    });
  });
});
