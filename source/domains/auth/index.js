// Core
import dg from 'debug';

// Instruments
import { getPassword } from '../../helpers';

const debug = dg('router:auth');
const key = getPassword();

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        const emailDecoded = Buffer.from(email, 'base64').toString();
        const passwordDecoded = Buffer.from(password, 'base64').toString();

        req.session.user = { email: emailDecoded };
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
