import mongoose from 'mongoose';
import {seasons, subjects} from "./index";

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
        season: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'seasons',
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
