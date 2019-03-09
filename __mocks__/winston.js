module.exports = {
    format: {
        combine:   jest.fn(),
        timestamp: jest.fn(),
        label:     jest.fn(),
        printf:    jest.fn(),
    },
    transports: {
        Console: jest.fn(),
        File:    jest.fn(),
    },
    createLogger: jest.fn(),
};
