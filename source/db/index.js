// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDb } from '../helpers';

const debug = dg('db');
const DB = getDb();

const mongooseOptions = {
    promiseLibrary:    global.Promise,
    poolSize:          10,
    keepAlive:         30000,
    connectTimeoutMS:  5000,
    reconnectTries:    Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser:   true,
    useFindAndModify:  false,
    useCreateIndex:    true,
};

// mongodb://username:password@localhost:27017/users
const connection = mongoose.connect(`mongodb://18.195.151.104:27017/${DB}`, mongooseOptions);

connection
    .then(() => {
        debug(`DB '${DB}' connected`);
    })
    .catch(({ message }) => {
        debug(`DB ${DB} connectionError: ${message}`);
    });
