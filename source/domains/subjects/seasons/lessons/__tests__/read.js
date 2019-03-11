// Core
import request from 'supertest';

// Instruments
import { app } from '../../../../../server';

const server = request(app);
describe('lessons read:', () => {
    test('should return 200 for getting all lessons', async (done) => {
        const response = await server.get('/api/subjects/1/seasons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all lessons and data should be an array', async (done) => {
        const response = await server.get('/api/subjects/1/seasons/1/lessons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
