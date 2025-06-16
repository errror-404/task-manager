import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

describe('Auth endpoints', () => {
  const testEmail = 'test@user.com';

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });

    await request(app).post('/api/auth/register').send({
      email: testEmail,
      name: 'Test',
      password: '123456',
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should login and return a JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
