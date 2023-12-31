const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    invSymbol: {
        type: String,
        require: true,
        // unique: true
    },
    ownerID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Employee"
    },
    decommissioned: Boolean,
    serialNumber: {
        type: String,
        require: true,
        // unique: true
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Asset', assetSchema)