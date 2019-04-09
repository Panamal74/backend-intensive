import mongoose from 'mongoose';

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
            required: true,
        },
        title: {
            type:     String,
            required: true,
            unique:   true,
        },
        image:   String,
        subject: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'subjects'
        },
        season: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'seasons'
        },
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({ 'name.first': 1, 'name.last': 1 });

// Collection
export const lessons = mongoose.model('lessons', schema);
