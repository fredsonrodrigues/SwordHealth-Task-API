import request from 'supertest';
import app from "../../../src/app";

let server;

beforeAll((done) => {
    server = app.listen(3001, () => done());
})

afterAll((done) => {
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