// Core
import dg from 'debug';

const debug = dg('router:auth');

export const post = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        const emailDecoded = Buffer.from(email, 'base64').toString();
        const passwordDecoded = Buffer.from(password, 'base64').toString();

        const agent = req.get('user-agent');
        req.session.user = { customer: { email: emailDecoded }, agent };

        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
