const mongoose = require('../Database/DB')
const Schema = mongoose.Schema;

let gameSchema = new Schema({
    score: {
        type: Number,
        required: true
    }
}, {
    collection: 'Game'
})

module.exports = mongoose.model('Game', gameSchema)


