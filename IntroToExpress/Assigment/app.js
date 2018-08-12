var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there welcome to my asigment");
});

app.get("/speak/:str", function(req, res){
    var say = req.params.str.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Mooo",
        dog: "Woof Woof",
        cat: "Hussss",
        goldfish: "bloog gloog"
    };
    var sound = sounds[say];
    res.send("The " + say + " says '" + sound + "'");
});

app.get("/repeat/:words/:times", function(req, res) {
    var word = req.params.words;
    var numb = Number(req.params.times);
    var sum = "";
    for(var i = 0; i < numb; i++){
       sum += word + " ";
    }
    res.send(sum);
});

app.get("*", function(req, res) {
    res.send("Sorry Page Not Found");
});









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!!!");
});