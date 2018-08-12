var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temerament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Mrs Norris",
//     age: 11,
//     temerament: "Eavil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     }else{
//         console.log("Was save to DtataBase");
//         console.log(cat);
//     }
// });

// adding new cat to database

Cat.create({
    name: "Snow White",
    age: 15,
    temerament: "Loving"
}, function(err, cats){
    if(err){
        console.log("Errore Doode");
        console.log(err);
    }else{
        console.log("Done");
        console.log(cats);
    }
});

//retreaving all cats from DB and console.log each one
Cat.find({}, function(err, cat){
    if(err){
        console.log("oh no, Error");
        console.log(err);
    }else{
        console.log("all the Cats ...");
        console.log(cat);
    }
});

