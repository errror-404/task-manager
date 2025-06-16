import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

describe('Rate limiting on /api/auth/login', () => {
  const testEmail = 'ratelimit@example.com';
  const password = '123456';

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });

    await request(app).post('/api/auth/register').send({
      email: testEmail,
      name: 'Rate Tester',
      password,
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should block after too many failed login attempts', async () => {
    const attempts = 11;
    let lastResponse;

    for (let i = 0; i < attempts; i++) {
      lastResponse = await request(app).post('/api/auth/login').send({
        email: testEmail,
        password: 'wrong-password',
      });
    }

    expect(lastResponse!.status).toBe(429);
    expect(lastResponse!.body).toHaveProperty('message');
    expect(lastResponse!.body.message).toMatch(/too many requests/i);
  });
});
