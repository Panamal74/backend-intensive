// Core
import request from 'supertest';

// Instruments
import { app } from '../../../../../../server';

const server = request(app);
describe('lesson read:', () => {
    test('should return 200 for get lesson', async (done) => {
        const response = await server.get('/api/subjects/1/seasons/1/lessons/1');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for get season and data should be an lesson', async (done) => {
        const response = await server.get('/api/subjects/1/seasons/1/lessons/1');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });
});
