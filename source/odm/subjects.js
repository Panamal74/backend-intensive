import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        title: {
            type:     String,
            required: true,
            unique:   true,
        },
        image:   String,
        seasons: [
            {
                season: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'seasons',
                },
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

schema.index({ title: 'text', description: 'text' });

// Collection
export const subjects = mongoose.model('subjects', schema);
