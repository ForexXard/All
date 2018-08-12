var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/publick"));
seedDB();


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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

//SHOWS - shows more info about campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//==================================================
//COMENTS ROUTES
//==================================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campgodund by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup camgrounds using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running !!!");
});










