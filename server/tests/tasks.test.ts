import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

describe('Task endpoints', () => {
  const testEmail = 'tasktest@example.com';
  const password = '123456';
  let token: string;
  let taskId: string;
  let columnId: string;

  beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.column.deleteMany();
    await prisma.user.deleteMany({ where: { email: testEmail } });

    await request(app).post('/api/auth/register').send({
      email: testEmail,
      name: 'Test User',
      password,
    });

    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password,
    });

    token = res.body.token;

    const colRes = await request(app)
      .post('/api/columns')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Column',
        position: 0,
      });

    columnId = colRes.body.id;
  });

  afterAll(async () => {
    await prisma.task.deleteMany();
    await prisma.column.deleteMany();
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Created from test',
        priority: 'medium',
        dueDate: '2025-07-01T00:00:00Z',
        columnId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    taskId = res.body.id;
  });

  it('should fetch all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        description: 'Updated from test',
        priority: 'high',
        dueDate: '2025-07-05T00:00:00Z',
        columnId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task');
  });

  it('should toggle a task as completed', async () => {
    const res = await request(app)
      .patch(`/api/tasks/${taskId}/toggle`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });
  it('should reorder columns', async () => {
    const colA = await request(app)
      .post('/api/columns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'A' });

    const colB = await request(app)
      .post('/api/columns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'B' });

    const res = await request(app)
      .patch('/api/columns/reorder')
      .set('Authorization', `Bearer ${token}`)
      .send([
        { id: colB.body.id, position: 0 },
        { id: colA.body.id, position: 1 },
        { id: columnId, position: 2 },
      ]);

    expect(res.statusCode).toBe(200);

    const updated = await request(app)
      .get('/api/columns')
      .set('Authorization', `Bearer ${token}`);

    const positions = updated.body.map((col: any) => col.position);
    expect(positions).toEqual([0, 1, 2]);
  });
});
