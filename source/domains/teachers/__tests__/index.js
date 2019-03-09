// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request(app);
describe('teachers', () => {
    test('should return 200 for getting all teachers', async (done) => {
        const response = await server.get('/api/teachers');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all teachers and data should be an array', async (done) => {
        const response = await server.get('/api/teachers');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
