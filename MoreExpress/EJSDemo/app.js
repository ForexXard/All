var express = require("express");
var app = express();

app.use(express.static("publick"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

app.get("/fall/:thing", function(req, res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "post 1", author: "Susy"},
        {title: "So Fluffy", author: "Charley"},
        {title: "This Onec", author: "Me"},
        ];
        res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running !!!");
});