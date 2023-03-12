import request from 'supertest';
import app from '../../../src/app';
import { Server } from 'http';

let server: Server;

beforeAll((done: jest.DoneCallback) => {
    server = app.listen(5001, () => done());
});

afterAll((done: jest.DoneCallback) => {
    server.close(() => done());
});

describe('Home API', () => {
    it('should return a hello world', async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            data: 'Hello World!'
        });
    });
});
