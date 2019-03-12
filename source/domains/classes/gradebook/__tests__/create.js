// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../../server';

const server = request.agent(app);
describe('gradebook create:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/api/auth/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 200 for create class', async (done) => {
        const response = await server.post('/api/classes/1/gradebook').send({});

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 and returning data should be an object', async (done) => {
        const response = await server.post('/api/classes/1/gradebook').send({});
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });
});
