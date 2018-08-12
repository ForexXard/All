var express = require("express");
var app = express();


// "/" => "Hi there!"
app.get("/", function(req, res){
   res.send("Hi There!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbie")
});
// "/dog" => "MEOW"
app.get("/dog", function(req, res) {
    res.send("NEOW") 
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
   res.send("Welcome to the jungle " + subreddit.toUpperCase() + " Subredit");
});

app.get("/r/:subreditname/comments/:id/:title", function(req, res) {
    console.log(req.params);
    res.send("Hello from the other side");
})

// whatn wil it show if the rout dos not exsist

app.get("*", function(req, res) {
    res.send("You are a Star!!!");
});
//Tell express to listen for requests (start Server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!!!")
});