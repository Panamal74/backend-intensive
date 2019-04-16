import mongoose from 'mongoose';
import { seasons } from  './index';

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
            maxlength: 30,
            required: true,
            unique:   true,
        },
        image: {
            type: String,
            match: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
        },
        seasons: [
            {
                season: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'seasons',
                    validate: {
                        validator(value) {
                            return seasons.findById(value).lean();
                        },
                        message(props) {
                            const { value } = props;
                            return `Season with ID '${value}' does not exist in seasons collection`;
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
export const subjects = mongoose.model('subjects', schema);
