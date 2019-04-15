// Core
// import bcrypt from 'bcrypt';

// Instruments
import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async register() {
        const { email, password } = this.data;
        // const hashedPassword = await bcrypt.hash(password, 11);
        // await users.create({ email, password: hashedPassword });

        // шифрую пароль в мидлваре pre
        await users.create({ email, password });

        return true;
    }
}
