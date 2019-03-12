// Core
import request from 'supertest';
import faker from 'faker';

// Instruments
import { app } from '../../../../server';

const server = request.agent(app);
describe('gradebook delete:', () => {
    beforeAll(async (done) => {
        const email = Buffer.from(faker.internet.email()).toString('base64');
        const password = Buffer.from(faker.internet.password()).toString('base64');

        const response = await server.post('/api/auth/login').send({ email, password });
        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return 204 for delete person', async (done) => {
        const response = await server.delete('/api/classes/1/gradebook').send({});

        expect(response.statusCode).toBe(204);
        done();
    });
});
