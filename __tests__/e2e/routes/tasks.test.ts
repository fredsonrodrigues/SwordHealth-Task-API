import request from 'supertest';
import app from "../../../src/app";
import { Server } from 'http';

let server: Server;
let taskID: Number;

beforeAll((done: jest.DoneCallback) => {
  server = app.listen(5000, () => done());
})

afterAll((done: jest.DoneCallback) => {
  server.close(() => done());
});

describe('Task API', () => {
  it('should return a list of tasks', async () => {
    const response = await request(server).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual("Task List")
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveLength(1);
  });

  it('should add a task', async () => {
    const response = await request(server)
      .post('/tasks/add')
      .send({
        title: "New Dummy Task",
        description: "A New task To create something",
        user_id: 1
      },);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data.title).toBe('New Dummy Task');
    expect(response.body.data.id).toBeDefined()
    taskID = response.body.data.id
  });

  it('should update a task', async () => {
    const response = await request(server)
      .patch(`/tasks/update/${taskID}`)
      .send({
        title: "Dummy Task Updated",
        description: "A task To update something",
        user_id: 1
      },);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data.title).toBe('Dummy Task Updated');
    expect(response.body.data.id).toBeDefined();
  });

  it('should delete a task', async () => {
    const response = await request(server).delete(`/tasks/delete/${taskID}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual(`Usuário com id ${taskID} excluído com sucesso!`)
    expect(response.body.data).toBeDefined();
  })
});