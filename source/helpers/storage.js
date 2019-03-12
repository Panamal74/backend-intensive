import { Store } from 'express-session';

export class Storage extends Store {
    constructor() {
        super();

        this.storage = new Map();
    }

    set(sid, session, callback) {
        const authTypes = [ 'cookie', 'jwt', 'local' ];

        try {
            const {
                cookie,
                user: { customer, agent, authType },
            } = session;

            const isExists = authTypes.some((type) => type === authType);

            if (!isExists) {
                throw new Error(`Auth type ${authType} is forbidden`);
            }

            if (!customer.email) {
                throw new Error('email should be specified');
            }

            const start = new Date(cookie.expires.getTime() - cookie.originalMaxAge);
            const data = {
                payload: customer,
                agent:   agent,
                start,
                end:     cookie.expires,
                authType,
            };

            this.storage.set(sid, {
                data,
                session,
            });
            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    get(sid, callback) {
        console.log('get');

        callback();
    }

    destroy(sid, callback) {}

    clearAll() {}

    getAll() {}
}
