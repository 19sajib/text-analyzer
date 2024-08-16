import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AuthService } from '../../src/auth/auth.service';

describe('AnalyzerController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Getting AuthService instance to register and login the test user
    authService = moduleFixture.get<AuthService>(AuthService);

    // Register and log in to get a JWT token for authentication
    await authService.register('testuser', 'testpassword');
    const loginResponse = await authService.login({ username: 'testuser', password: 'testpassword' });
    token = loginResponse.access_token;
  });

  afterAll(async () => {
    await authService.deleteUser('testuser');
    await app.close();
  });

  it('/analyzer/word-count (POST) should return word count', async () => {
    const response = await request(app.getHttpServer())
      .post('/analyzer/word-count')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'This is a test sentence.' })
      .expect(201)
      .expect({ wordCount: 5})
  });

  it('/analyzer/character-count (POST) should return character count', async () => {
    const response = await request(app.getHttpServer())
      .post('/analyzer/character-count')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'This is a test sentence.' })
      .expect(201)
      .expect({ characterCount: 24 })
  });

  it('/analyzer/sentence-count (POST) should return sentence count', async () => {
    const response = await request(app.getHttpServer())
      .post('/analyzer/sentence-count')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'This is the first sentence. And this is the second!' })
      .expect(201)
      .expect({ sentenceCount: 2 })
  });

  it('/analyzer/paragraph-count (POST) should return paragraph count', async () => {
    const response = await request(app.getHttpServer())
      .post('/analyzer/paragraph-count')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'This is the first paragraph.\n\nThis is the second paragraph.' })
      .expect(201)
      .expect({ paragraphCount: 2})
  });

  it('/analyzer/longest-word (POST) should return longest word(s)', async () => {
    const response = await request(app.getHttpServer())
      .post('/analyzer/longest-word')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'The quick brown fox jumped over the lazy dog.' })
      .expect(201);

    expect(response.body).toEqual(['jumped']); // Expecting the longest word to be 'jumped'
  });
});
