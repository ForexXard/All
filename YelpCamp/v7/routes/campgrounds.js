var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){
    req.user
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
router.post("/", function(req, res){
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
router.get("/new", function(req, res) {
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

module.exports = router;
