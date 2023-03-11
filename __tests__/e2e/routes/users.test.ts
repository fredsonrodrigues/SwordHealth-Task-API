import request from 'supertest';
import app from "../../../src/app";
import { Server } from 'http';
import { prismaMock } from '../../../src/singleton'

let server: Server;

beforeAll((done: jest.DoneCallback) => {
  server = app.listen(3002, () => done());
})

afterAll((done: jest.DoneCallback) => {
  server.close(() => done());
});

describe('Users API', () => {
  it('should return a list of Users', async () => {
    let listUsers = [
      {
        id: 1,
        name: 'User Alitec 1',
        email: 'aliancatecnologia.adm@gmail.com',
        password: '123456',
        role: "USER",
        admin_user: 1
      }
    ];
    // @ts-ignore -- awaiting fix:
    prismaMock.user.findMany.mockResolvedValue(listUsers)
    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual("Lista de usuários")
    expect(response.body.data).toBeDefined();
  });

  it('should add a task', async () => {
    let usermock = {
      name: 'Fredson Rodrigues',
      email: 'fredson.rodrigues.principal@gmail.com',
      password: '123456',
      role: "ADMIN",
      admin_user: 0
    }
    // @ts-ignore -- awaiting fix:
    prismaMock.user.create.mockResolvedValue(usermock)
    const response = await request(server)
      .post('/users/add')
      .send(usermock);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data.email).toBe('fredson.rodrigues.principal@gmail.com');
    expect(response.body.message).toEqual("Usuário com email fredson.rodrigues.principal@gmail.com criado com sucesso!")
    let userID = response.body.data.id

    const response2 = await request(server)
      .patch(`/users/update/${userID}`)
      .send({...usermock, email: 'fredson.rodrigues.principal2@gmail.com'});

    expect(response2.status).toBe(200);
    expect(response2.body.data).toHaveProperty('email');
    expect(response2.body.data.email).toBe('fredson.rodrigues.principal2@gmail.com');
    expect(response2.body.message).toEqual("Usuário com email fredson.rodrigues.principal2@gmail.com criado com sucesso!")

    const response3 = await request(server)
      .delete(`/users/delete/${userID}`)
      .send(usermock);

    expect(response3.status).toBe(200);
    expect(response3.body.data).toHaveProperty('email');
    expect(response3.body.data.email).toBe('fredson.rodrigues.principal@gmail.com');
    expect(response3.body.message).toEqual(`Usuário com id ${userID} excluído com sucesso!`)
  });
});