const request = require('supertest');
const fs = require('fs');
const app = require('./app');

describe('URL Shortener API', () => {
  beforeEach(() => {
    // Clear the history and analytics files before each test
    fs.writeFileSync('history.json', '[]', 'utf8');
    fs.writeFileSync('analytics.json', '{}', 'utf8');
  });

  describe('POST /api/shorten', () => {
    test('should shorten a valid URL', async () => {
      const response = await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com' })
        .expect(200);

      expect(response.body.shortUrl).toBeDefined();
      expect(response.body.qrCode).toBeDefined();
    });

    test('should return an error for an invalid URL', async () => {
      const response = await request(app)
        .post('/api/shorten')
        .send({ url: 'invalid-url' })
        .expect(400);

      expect(response.body.error).toBe('Invalid URL');
    });

    test('should return an error if the custom alias is already taken', async () => {
      // Create a URL with a custom alias
      await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com', customAlias: 'abc123' })
        .expect(200);

      // Try to create another URL with the same custom alias
      const response = await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com', customAlias: 'abc123' })
        .expect(409);

      expect(response.body.error).toBe('Custom alias is already taken.');
    });
  });

  describe('GET /api/history', () => {
    test('should get the user\'s URL history', async () => {
      // Create a URL for the user
      await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com' })
        .expect(200);

      // Get the user's URL history
      const response = await request(app)
        .get('/api/history')
        .set('Cookie', ['userIdentifier=123'])
        .expect(200);

      expect(response.body.history.length).toBe(1);
    });
  });

  describe('GET /api/analytics/:id', () => {
    test('should get the analytics for a URL', async () => {
      // Create a URL
      const shortenResponse = await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com' })
        .expect(200);

      // Get the analytics for the created URL
      const response = await request(app)
        .get(`/api/analytics/${shortenResponse.body.shortUrl}`)
        .expect(200);

      expect(response.body.analytics).toBeDefined();
    });

    test('should return an empty object for non-existing URL analytics', async () => {
      // Get the analytics for a non-existing URL
      const response = await request(app)
        .get('/api/analytics/non-existing-url')
        .expect(200);

      expect(response.body.analytics).toEqual({});
    });
  });

  describe('GET /:id', () => {
    test('should redirect to the original URL for a valid short URL', async () => {
      // Create a URL
      const shortenResponse = await request(app)
        .post('/api/shorten')
        .send({ url: 'https://example.com' })
        .expect(200);

      // Access the short URL and expect a redirect
      await request(app)
        .get(`/${shortenResponse.body.shortUrl}`)
        .expect(301);
    });

    test('should return an error for an invalid short URL', async () => {
      // Access an invalid short URL
      const response = await request(app)
        .get('/non-existing-url')
        .expect(404);

      expect(response.body.error).toBe('Invalid URL');
    });
  });
});
