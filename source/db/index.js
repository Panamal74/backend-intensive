import mongoose from 'mongoose';
import dg from 'debug';

const debug = dg('db');

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
const connection = mongoose.connect('mongodb://localhost:27017/school', mongooseOptions);

connection
    .then(() => {
        debug('DB connected');
    })
    .catch(({ message }) => {
        debug(`DB connectionError: ${message}`);
    });
