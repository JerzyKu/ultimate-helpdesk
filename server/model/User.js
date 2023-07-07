const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)