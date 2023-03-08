import request from 'supertest';
import app from "../../../src/app";

let server;

beforeAll((done) => {
  server = app.listen(3000, () => done());
})

afterAll((done) => {
  server.close(() => done());
});

describe('Task API', () => {
  it('should return a list of tasks', async () => {
    const response = await request(server).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        complete: false,
        description: 'Task1',
        user_id: 1,
      },
    ]);
  });

  it('should add a task', async () => {
    const response = await request(server)
      .post('/tasks/add')
      .send({ description: 'New task', user_id: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'Task Added!' });
  });
});