var mongoose = require("mongoose");
var pasportLocalM = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});


UserSchema.plugin(pasportLocalM);

module.exports = mongoose.model("User", UserSchema);