var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
mongoose.connect("mongodb://localhost:27017/BrandDB", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/publick"));


app.get("/", function(req, res){
    res.render("index");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running");
});