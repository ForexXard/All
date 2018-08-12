var mongoose = require("mongoose");

var comentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", comentSchema);