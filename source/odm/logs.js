import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        method:   String,
        path:     String,
        duration: {
            start: Date,
            end:   Date,
        },
        payload: Object,
        agent:   String,
    },
    {
        timestamps: { createdAt: 'created', updatedAt: false },
        capped:     { size: 50 * 1024 * 1024, max: 50000 },
    },
);

// Collection
export const logs = mongoose.model('logs', schema);
