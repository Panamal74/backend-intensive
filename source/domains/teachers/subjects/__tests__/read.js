// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../../server';

const server = request.agent(app);
describe('subjects read:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/api/auth/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 200 for getting all subjects', async (done) => {
        const response = await server.get('/api/teachers/1/subjects');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all subjects and data should be an array', async (done) => {
        const response = await server.get('/api/teachers/1/subjects');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
