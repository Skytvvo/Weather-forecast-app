const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    id: {type :Number, required: true},
    name: String,
    state: String,
    country: String,
    coord:{
        lon:Number,
        lan:Number
    }
})

module.exports = model("City", schema);
