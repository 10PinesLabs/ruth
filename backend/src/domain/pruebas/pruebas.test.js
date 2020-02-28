import request from 'supertest';
import app from '~/server';

describe('Post Endpoints', () => {
  it('should create a new post', () => request(app)
    .get('/api/pruebas/temas')
    .send()
    .then((res) => expect(res.statusCode).toEqual(403)));
});
