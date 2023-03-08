import request from 'supertest';
import app from "../../../src/app";
import { Server } from 'http';

let server: Server;

beforeAll((done: jest.DoneCallback) => {
  server = app.listen(3002, () => done());
})

afterAll((done: jest.DoneCallback) => {
  server.close(() => done());
});

describe('Users API', () => {
  it('should return a list of tasks', async () => {
    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        type: 2,
        description: 'User1',
        user_manager: 1,
      },
    ]);
  });

  it('should add a task', async () => {
    const response = await request(server)
      .post('/users/add')
      .send({ description: 'New User', type: 2, user_manager: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        success: true,
        data: 'User Added!'
    });
  });
});