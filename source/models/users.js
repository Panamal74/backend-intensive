// Core
// import bcrypt from 'bcrypt';

// Instruments
import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async register() {
        await users.create(this.data);

        // const { email, password } = this.data;
        // const hashedPassword = await bcrypt.hash(password, 11);
        // await users.create({ email, password: hashedPassword });

        return true;
    }
}
