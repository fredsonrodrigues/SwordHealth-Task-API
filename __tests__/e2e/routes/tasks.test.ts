import request from 'supertest';
import app from "../../../src/app";
import { Server } from 'http';

let server: Server;

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
  });

  it('should add, update and delete a task', async () => {
    const response = await request(server)
      .post('/tasks/add')
      .send({
        title: "Dummy Task",
        description: "A task To create something",
        user_id: 1
      },);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data.title).toBe('Dummy Task');
    expect(response.body.data.id).toBeDefined()
    let taskID = response.body.data.id

    const response2 = await request(server)
      .patch(`/tasks/update/${taskID}`)
      .send({
        title: "Dummy Task Updated",
        description: "A task To update something",
        user_id: 1
      },);

    expect(response2.status).toBe(200);
    expect(response2.body.data).toHaveProperty('title');
    expect(response2.body.data.title).toBe('Dummy Task Updated');
    expect(response2.body.data.id).toBeDefined();

    const response3 = await request(server).delete(`/tasks/delete/${taskID}`);

    expect(response3.status).toBe(200);
    expect(response3.body.success).toBe(true);
    expect(response3.body.message).toEqual(`Usuário com id ${taskID} excluído com sucesso!`)
    expect(response3.body.data).toBeDefined();
  });
});