import mongoose from 'mongoose';
import {classes, parents} from './index';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
        },
        name: {
            first: {
                type:     String,
                minlength: 2,
                maxlength: 15,
                required: true,
            },
            last: {
                type:     String,
                minlength: 2,
                maxlength: 15,
                required: true,
            },
        },
        image: {
            type:  String,
            match: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
        },
        dateOfBirth: {
            type: Date,
            max: () => {
                const maxYear = (new Date()).getFullYear() - 5;
                return (new Date()).setFullYear(maxYear);
            },
        },
        emails: [
            {
                email: {
                    type:     String,
                    match:    /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
                    required: true,
                    unique:   true,
                },
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone: {
                    type:  String,
                    match: /^\(\d{3,6}\)\s[\d\s]{5,9}$/,
                },
                primary: Boolean,
            },
        ],
        sex: {
            type: String,
            enum: ['m', 'f'],
        },
        social: {
            facebook: String,
            linkedIn: String,
            skype:    String,
            telegram: String,
        },
        class: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:  'classes',
            validate: {
                validator(value) {
                    return classes.findById(value).lean();
                },
                message(props) {
                    const { value } = props;
                    return `Class with ID '${value}' does not exist in classes collection`;
                },
            },
        },
        parents: [
            {
                parent: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'parents',
                    validate: {
                        validator(value) {
                            return parents.findById(value).lean();
                        },
                        message(props) {
                            const { value } = props;
                            return `Parent with ID '${value}' does not exist in parents collection`;
                        },
                    },
                },
            },
        ],
        description: {
            type:      String,
            maxlength: 250,
        },
        started: Date,
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
export const persons = mongoose.model('persons', schema);
