const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    invSymbol: {
        type: String,
        require: true
    },
    owner: {}
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Asset', assetSchema)