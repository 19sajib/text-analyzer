import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerService } from './analyzer.service';

describe('AnalyzerService', () => {
  let analyzerService: AnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyzerService],
    }).compile();

    analyzerService = module.get<AnalyzerService>(AnalyzerService);
  });

  it('should be defined', () => {
    expect(analyzerService).toBeDefined();
  });

  describe('wordCounts', () => {
    it('should return the correct word count', async () => {
      const text = 'This is a test sentence.';
      const result = await analyzerService.wordCounts(text);
      expect(result).toBe(5);
    });
  });

  describe('characterCounts', () => {
    it('should return the correct character count', async () => {
      const text = 'This is a test sentence.';
      const result = await analyzerService.characterCounts(text);
      expect(result).toBe(24);
    });
  });

  describe('sentenceCounts', () => {
    it('should return the correct sentence count', async () => {
      const text = 'This is the first sentence. And this is the second!';
      const result = await analyzerService.sentenceCounts(text);
      expect(result).toBe(2);
    });

    it('should handle edge cases with multiple punctuation marks', async () => {
      const text = 'Wait... what?! Seriously?!';
      const result = await analyzerService.sentenceCounts(text);
      expect(result).toBe(3);
    });
  });

  describe('paragraphCounts', () => {
    it('should return the correct paragraph count', async () => {
      const text = 'This is the first paragraph.\n\nThis is the second paragraph.';
      const result = await analyzerService.paragraphCounts(text);
      expect(result).toBe(2);
    });
  });

  describe('getLongestWord', () => {
    it('should return the longest word(s)', async () => {
      const text = 'The quick brown fox jumped over the lazy dog.';
      const result = await analyzerService.getLongestWord(text);
      expect(result).toEqual(['jumped']);
    });

    it('should return multiple words if there is a tie for longest word', async () => {
      const text = 'The quick brown fox jumps over the lazy dogs.';
      const result = await analyzerService.getLongestWord(text);
      expect(result).toEqual(['quick', 'brown', 'jumps']);
    });
  });
});
