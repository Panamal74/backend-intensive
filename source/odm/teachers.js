import mongoose from 'mongoose';
import { subjects } from './index';

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
                const maxYear = (new Date()).getFullYear() - 18;
                return (new Date()).setFullYear(maxYear);
            },
        },
        emails:      [
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
        subjects: [
            {
                subject: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'subjects',
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

// schema.path('phones').validate(function(value) {
//     const regex = /^38\d{3}-\d{3}-\d{4}$/;
//
//     const isValid = value.every(({ phone }) => regex.test(phone));
//
//     return isValid;
// }, 'Phone should have format 38XXX-XXX-XXXX');

// Collection
export const teachers = mongoose.model('teachers', schema);
