import v4 from 'uuid/v4';

// ODM
import {gradebooks} from '../odm';

export class Gradebooks {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const gradebook = {
            hash: v4(),
            ...this.data,
        };
        const data = await gradebooks.create(gradebook);

        return data;
    }

    async find() {
        const data = await gradebooks.find().lean();

        return data;
    }

    async findById() {
        const { id } = this.data;
        const data = await gradebooks
            .findById(id)
            .populate({ path: 'records.personHash', select: '-_id -__v' })
            .populate({ path: 'records.teacherHash', select: '-_id -__v' })
            .populate({ path: 'records.subjectHash', select: '-_id -__v' })
            .populate({ path: 'records.seasonHash', select: '-_id -__v' })
            .populate({ path: 'records.lessonHash', select: '-_id -__v' })
            .select('-_id -__v')
            .lean();

        return data;
    }

}
