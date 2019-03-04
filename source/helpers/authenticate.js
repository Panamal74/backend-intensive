// Core
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Instruments
import { getPassword } from './getPassword';

const verify = promisify(jwt.verify);
const key = getPassword();

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const data = await verify(authorization, key);

        // TODO: Need to connect to the database
        next();
    } catch (error) {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};
