// Core
import request from 'supertest';

// Instruments
import { app } from '../../../../server';

const server = request(app);
describe('seasons read:', () => {
    test('should return 200 for getting all seasons', async (done) => {
        const response = await server.get('/api/subjects/1/seasons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all seasons and data should be an array', async (done) => {
        const response = await server.get('/api/subjects/1/seasons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
