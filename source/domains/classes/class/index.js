// Core
import dg from 'debug';

// Instruments
import { Classes } from '../../../controllers';

const debug = dg('router:classes:class');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { classId: id } = req.params;
        const classes = new Classes({ id });
        const data = await classes.findById();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { classId: id } = req.params;
        const { gradebook } = req.body;
        const classes = new Classes({ id, gradebook });
        const data = await classes.assignGradebook();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const put = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
