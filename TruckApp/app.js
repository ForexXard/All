var
express = require("express"),
app = express(),
methodOverride   = require("method-override"),
bodyParser = require("body-parser"),
mongoose = require("mongoose");


//APP configoration
mongoose.connect("mongodb://localhost:27017/TruckApp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("publick"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Mongoose Model

var truckSchema = new mongoose.Schema({
    dataPartenca: String,
	targa: String,
	luogoP: String,
    merce: String,
    ton: String,
	luogoA: String,
	dataArrivo: String,
	kmCarico: String,
	kmVuoto: String,
	nPratica: String,
	nomeLavaggio: String,
    costoLavaggio: String,
	usoPompa: String,
	usoCompressore: String,
	quantitaServ: String,
	litriGasolio: String,
	luogoRiforn: String,
    image: String
});

var Truck = mongoose.model("Truck", truckSchema);


//RESTfull Routs
app.get("/", function(req, res){
    res.redirect("/main");
});

app.get("/main", function(req, res){
    Truck.find({}, function(err, truck){
        if(err){
            
        }else {
            res.render("index", {truck: truck});
        }
    });
});

//NEW Route
app.get("/main/new", function(req, res) {
    res.render("new");
});

//POST Route
app.post("/main", function(req, res){
    Truck.create(req.body.truck, function(err, newTruck){
        if(err){
            console.log(err);
        } else {
            res.redirect("/main");
        }
    });
});

//SHOW Route
app.get("/main/:id", function(req, res) {
    Truck.findById(req.params.id, function(err, foundTruck){
        if(err){
            console.log(err);
        } else {
            res.render("show", {truck: foundTruck});
        }
    });
});

//Edit Route

app.get("/main/:id/edit", function(req, res) {
    Truck.findById(req.params.id, function(err, editTruck){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {truck: editTruck});
        }
    });
});

// Upadate Route
app.put("/main/:id", function(req, res){
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    Truck.findByIdAndUpdate(req.params.id, req.body.truck, function(err, updatedTruck){
        if(err){
            console.log(err);
            res.redirect("/main");
        } else{
            res.redirect("/main");
        }
    });
});

//Delete Route
app.delete("/main/:id", function(req, res){
    Truck.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/main");
        }
    });
});
  

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running The Server!!!");
});