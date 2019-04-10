import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        image: String,
        year:  {
            type:     Number,
            required: true,
            index:    true,
        },
        class: {
            type:     String,
            required: true,
            index:    true,
        },
        records: [
            {
                personHash: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'persons',
                },
                teacherHash: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'teachers',
                },
                subjectHash: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'subjects',
                },
                seasonHash: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'seasons',
                },
                lessonHash: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'lessons',
                },
                mark: Number,
            },
        ],
        description: String,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

// Collection
export const gradebooks = mongoose.model('gradebooks', schema);
