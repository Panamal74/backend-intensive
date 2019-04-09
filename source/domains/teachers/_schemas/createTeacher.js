export default {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type:      'string',
                    minLength: 5,
                },
                last: {
                    type:      'string',
                    minLength: 5,
                },
            },
            required: [ 'first' ],
        },
    },
    required: [ 'name' ],

    // additionalProperties: false,
};
