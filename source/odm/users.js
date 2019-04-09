import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        email: {
            type:     String,
            required: true,
            unique:   true,
        },
        password: {
            type:     String,
            select:   false,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

// Collection
export const users = mongoose.model('users', schema);
