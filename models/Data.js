const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    countries: [
        {
            name: String,
            code: String
        }
    ],
    tags: {
        type: Array
    },
});



const Data = mongoose.model('data', dataSchema);
module.exports = Data;
