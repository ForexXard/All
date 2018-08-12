// all the midleware goes here
var Campground     = require("../models/campground"),
    Comment        = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            //dos user owne campground
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            }else{
                req.flash("error", "You dont have permision to do that");
                res.redirect("back");
            }
        }
    });

    }else{
        req.flash("error", "You need to be loged in");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            //dos user owne campground
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            }else{
                req.flash("error", "This comment is not yours");
                res.redirect("back");
            }
        }
    });

    }else{
        req.flash("error", "You need to be loged in");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logad in to to that");
    res.redirect("/login");
};



module.exports = middlewareObj;