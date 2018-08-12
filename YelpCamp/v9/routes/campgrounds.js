var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){
    req.user;
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//app.post wil send  the data from form to the campground page
//Create - send the data from the form to DB
router.post("/", isLoggedIn, function(req, res){
    //get data from form and add it to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
});
// here is the form to send a new camp ground to the app.post
// New - show form to campgrounds
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOWS - shows more info about campground
router.get("/:id", function(req, res) {
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

// Edit campgrount

// router.get("/:id/edit", function(req, res) {
    
//     res.send("Eddit route");
// });
router.get("/:id/edit", function(req, res){
        res.send("Tooooooooooooooooooooooo")
});
//update campground



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;
