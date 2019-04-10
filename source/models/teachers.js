import v4 from 'uuid/v4';

// ODM
import {teachers} from '../odm';

export class Teachers {
    constructor(data) {
        this.data = data;
    }

    async find() {
        const data = await teachers.find().lean();

        return data;
    }

    async findById() {
        const { id } = this.data;
        const data = await teachers
            .findById(id)
            .populate({ path: 'subjects.subject', select: '-_id -__v' })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async create() {
        const teacher = {
            hash: v4(),
            ...this.data,
        };
        const data = await teachers.create(teacher);

        return data;
    }
}
