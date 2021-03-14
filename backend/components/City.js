const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    _id:Schema.Types.ObjectId,
    id :Number,
    name: String,
    state: String,
    country: String,
    coord:{
        lat: Number,
        lon: Number
    }
})

module.exports = model("City", schema);
