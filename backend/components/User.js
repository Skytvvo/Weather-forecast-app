const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    login:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    cities: [{type:Types.ObjectId, ref: "City"}],
    theme: {type: String, default: ""}
})

module.exports = model("User", schema);