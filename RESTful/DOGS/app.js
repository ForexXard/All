var 
express        = require("express"),
app            = express(),
mongoose       = require("mongoose"),
bodyParser     = require("body-parser"),
methodOverride = require("method-override");

//APP Config
mongoose.connect("mongodb://localhost:27017/dogs", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("publick"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//Mongoose Schema and Model
var dogSchema = new mongoose.Schema({
    name: String,
    age: String,
    bread: String,
    cute: Boolean
});

var Dog = mongoose.model("Dog", dogSchema);

//RESTfull ROUTS
//////////////////////////////////////////////////////////////////////

//Index Route
app.get("/", function(req, res){
    res.redirect("/dogs");
});

app.get("/dogs", function(req, res) {
    res.render("index");
});






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("DOG IS RUNNING");
});







