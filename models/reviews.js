//Model for reviews
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Making schema
const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Exporting schema
module.exports = mongoose.model("Review", ReviewSchema);
