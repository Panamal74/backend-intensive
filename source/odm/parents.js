import mongoose from 'mongoose';
import {persons} from './index';

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
                type:      String,
                minlength: 2,
                maxlength: 15,
                required:  true,
            },
            last: {
                type:      String,
                minlength: 2,
                maxlength: 15,
                required:  true,
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
                    // (044) 123 45 67
                    // E.123, національний формат: міжміський префікс та код населеного пункту в дужках, телефонний номер відділяється від коду та розділяється пропусками
                    // https://uk.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%BD%D0%B8%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80
                    // https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%BD%D0%B8%D1%85_%D0%BA%D0%BE%D0%B4%D1%96%D0%B2_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8
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
        pupils: [
            {
                person: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  'pupils',
                    validate: {
                        validator(value) {
                            return persons.findById(value).lean();
                        },
                        message(props) {
                            const { value } = props;
                            return `Pupil with ID '${value}' does not exist in persons collection`;
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

schema.index({ 'name.first': 1, 'name.last': 1 });

// Collection
export const parents = mongoose.model('parents', schema);
