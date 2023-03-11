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
      },
      {
        id: 2,
        name: 'User Alitec 2',
        email: 'outroemail@gmail.com',
        password: '123456',
        role: "USER",
        admin_user: 0
      }
    ];
    // @ts-ignore -- awaiting fix:
    prismaMock.user.findMany.mockResolvedValue(listUsers)
    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: listUsers,
      message: "Lista de usuários",
      success: true
    });
  });

  it('should add a task', async () => {
    // @ts-ignore -- awaiting fix:
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: 'Fredson Rodrigues',
      email: 'fredson.rodrigues.principal@gmail.com',
      password: '123456',
      role: "ADMIN",
      admin_user: 0
    })
    const response = await request(server)
      .post('/users/add')
      .send({
        name: 'Fredson Rodrigues',
        email: 'fredson.rodrigues.principal@gmail.com',
        password: '123456',
        role: "ADMIN",
        admin_user: 0
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        email: "fredson.rodrigues.principal@gmail.com",
        id: 1,
      },
      message: "Usuário com email fredson.rodrigues.principal@gmail.com criado com sucesso!",

    });
  });
});