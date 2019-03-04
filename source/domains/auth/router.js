// Core
import express from 'express';
import passport from 'passport';

const route = express.Router();

route.post('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

export { route as auth };
