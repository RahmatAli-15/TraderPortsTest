const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [
        {
            currencyPair: {
                type: String,
                enum: [
                    'EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD',
                    'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
                    'XAU/USD', 'XAG/USD', 'Others',
                ],
                required: true,
            },
            strategyUsed: {
                type: String,
                required: true,
            },
            target: {
                type: Number,
                required: true,
            },
            stoploss: {
                type: Number,
                required: true,
            },
            forexSession: {
                type: String,
                enum: ['London', 'New York', 'Tokyo', 'Sydney'],
                required: true,
            },
            buyOrSell: {
                type: String,
                enum: ['buy', 'sell'],
                required: true,
            },
            profit: {
                type: Number,
                default: 0,
            },
            loss: {
                type: Number,
                default: 0,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
