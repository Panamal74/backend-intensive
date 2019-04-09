import mongoose from 'mongoose';

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
                required: true,
            },
            last: {
                type:     String,
                required: true,
            },
        },
        image:       String,
        dateOfBirth: Date,
        emails:      [
            {
                email: {
                    type:     String,
                    required: true,
                    unique:   true,
                },
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone:   String,
                primary: Boolean,
            },
        ],
        sex:    String,
        social: {
            facebook: String,
            linkedIn: String,
            skype:    String,
            telegram: String,
        },
        subjects: [
            {
                subject: mongoose.SchemaTypes.ObjectId,
            },
        ],
        description: String,
        started:     Date,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({ 'name.first': 1, 'name.last': 1 });

schema.path('phones').validate(function(value) {
    const regex = /^38\d{3}-\d{3}-\d{4}$/;

    const isValid = value.every(({ phone }) => regex.test(phone));

    return isValid;
}, 'Phone should have format 38XXX-XXX-XXXX');

// Collection
export const teachers = mongoose.model('teachers', schema);
