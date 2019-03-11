// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request(app);
describe('subject read:', () => {
    test('should return 200 for get subject', async (done) => {
        const response = await server.get('/api/subjects/1');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for get subject and data should be an object', async (done) => {
        const response = await server.get('/api/subjects/1');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeFalsy();
        expect(typeof data).toBe('object');
        done();
    });
});
