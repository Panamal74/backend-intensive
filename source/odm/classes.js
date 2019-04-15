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
            min:      0,
            required: true,
            index:    true,
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
        room: {
            type:     Number,
            min:      0,
            required: true,
            index:    true,
        },
        floor: {
            type:     Number,
            min:      0,
        },
        gradebooks: [
            {
                gradebook: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'gradebooks',
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
export const classes = mongoose.model('classes', schema);
