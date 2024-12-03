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
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [
        {
            currencyPair: {
                type: String,
                required: true
            },
            strategyUsed: {
                type: String, // e.g., 'RSI', 'EMA Crossover'
                required: true
            },
            currencyPair: {
                type: String,
                enum: [
                  'EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD',
                  'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
                  'XAU/USD', 'XAG/USD', 'Others' // Major pairs, gold, silver, and "Custom" option
                ],
                required: true,
              },
            target: {
                    type: Number, // e.g., 0.5 means 0.5% stop loss
                    required: true
                },
                stoploss: {
                    type: Number, // e.g., 0.5 means 0.5% stop loss
                    required: true
                },
                forexSession: {
                    type: String,
                    enum: ['London', 'New York', 'Tokyo', 'Sydney'], // Restricts to these session options
                    required: true
                },
                profit: {
                    type: Number, // Represents profit amount
                    default: 0
                },
                loss: {
                    type: Number, // Represents loss amount
                    default: 0
                },

                createdAt: {
                    type: Date,
                    default: Date.now
                },
            }
    ]
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
