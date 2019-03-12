// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
describe('pupils create:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/api/auth/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 200 for create classes', async (done) => {
        const response = await server.post('/api/classes').send({});

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 and returning data should be an array', async (done) => {
        const response = await server.post('/api/classes').send({});
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
