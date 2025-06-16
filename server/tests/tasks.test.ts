import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

describe('Column endpoints', () => {
  const testEmail = 'columnuser@example.com';
  const password = '123456';
  let token: string;

  beforeAll(async () => {
    // ✅ Eliminar primero las tareas asociadas a columnas
    await prisma.task.deleteMany();
    await prisma.column.deleteMany();
    await prisma.user.deleteMany({ where: { email: testEmail } });

    await request(app).post('/api/auth/register').send({
      email: testEmail,
      name: 'Column Tester',
      password,
    });

    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password,
    });

    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.task.deleteMany(); // ✅ tareas primero
    await prisma.column.deleteMany();
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should create a new column', async () => {
    const res = await request(app)
      .post('/api/columns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Nueva columna' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Nueva columna');
  });

  it('should fetch all user columns', async () => {
    const res = await request(app)
      .get('/api/columns')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should not allow access without token', async () => {
    const res = await request(app).get('/api/columns');
    expect(res.statusCode).toBe(401);
  });
});
