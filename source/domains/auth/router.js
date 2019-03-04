// Core
import express from 'express';

// Handlers
import * as authenticate from './';

const route = express.Router();

route.post('/login', authenticate.post);

export { route as auth };
