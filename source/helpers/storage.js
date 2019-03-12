import dg from 'debug';
import { Store } from 'express-session';

const debug = dg('storage');

export class Storage extends Store {
    constructor() {
        super();

        this.storage = new Map();
    }

    set(sid, session, callback) {
        debug('set');
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
        debug('get');

        try {
            const data = this.storage.get(sid);

            if (data && data.session) {
                return callback(null, data.session);
            }

            callback(null, null);
        } catch (error) {
            callback(error);
        }
    }

    destroy(sid, callback) {
        debug('destroy');

        try {
            this.storage.delete(sid);
            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    clearAll() {}

    getAll() {
        debug('getAll');

        const values = this.storage.values();
        const data = [ ...values ].map(({ data }) => data);

        return data;
    }
}
