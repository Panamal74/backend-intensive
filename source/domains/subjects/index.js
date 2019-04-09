// Core
import dg from 'debug';

// Instruments
import { Subjects } from '../../controllers';

const debug = dg('router:subjects:subject');

export const getSubjects = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const subjects = new Subjects();
        const data = await subjects.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createSubject = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const subjects = new Subjects(req.body);
        const data = await subjects.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const get = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = {};

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
