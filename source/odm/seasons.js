import mongoose from 'mongoose';
import { lessons, subjects } from './index';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        order: {
            type:     Number,
            min:      0,
            required: true,
        },
        title: {
            type:      String,
            maxlength: 30,
            required:  true,
            unique:    true,
        },
        image: {
            type: String,
            match: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
        },
        subject: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'subjects',
            validate: {
                validator(value) {
                    return subjects.findById(value).lean();
                },
                message(props) {
                    const { value } = props;
                    return `Subject with ID '${value}' does not exist in subjects collection`;
                },
            },
        },
        lessons: [
            {
                lesson: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'lessons',
                    validate: {
                        validator(value) {
                            return lessons.findById(value).lean();
                        },
                        message(props) {
                            const { value } = props;
                            return `Lesson with ID '${value}' does not exist in lessons collection`;
                        },
                    },
                },
            },
        ],
        description: {
            type:      String,
            maxlength: 250,
        },
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({ title: 'text', description: 'text' });

// Collection
export const seasons = mongoose.model('seasons', schema);
