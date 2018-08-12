var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//             name: "Mountain Goat's Rest", 
//             image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjJN7afQX9VFewqt-FWa0CenfQ7vMFJthr2kWfDNak4UwzsAo1Ag",
//             description: "This is a huge granet Hill, you cant't pee there so hold it"
            
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});
// here are the campgrounds page
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//app.post wil send  the data from form to the campground page
//Create - send the data from the form to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add it to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
});
// here is the form to send a new camp ground to the app.post
// New - show form to campgrounds
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

//SHOWS - shows more info about campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running !!!");
});










