import { Store } from 'express-session';

export class Storage extends Store {
    constructor() {
        super();

        this.storage = new Map();
    }

    set(sid, session, callback) {
        console.log('set', sid);
        callback();
    }

    get(sid, callback) {
        console.log('get');
        callback();
    }

    destroy(sid, callback) {}

    clearAll() {}

    getAll() {}
}
