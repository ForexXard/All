var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data =[
    {
        name: "Cloud' Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQqRyzdi3ZJ6vIi0XsN7oJ68M42SpYUZF50eL0npN0WitD9cItcg",
        discription: "Bla Bla Bla"
    },
    {
        name: "River Ocean Lake",
        image: "https://cdn4.gbot.me/photos/rc/Pk/1409722547/-_Scotts_Flat_Lake_in_Fool-20000000008301627-500x375.jpg",
        discription: "uuuuuuuuuu"
    },
    {
        name: "Moutaing Hop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Kp0ca7xwen1Y0C_KpJEAtuPs4zVosPuHafK7PO7xYsfe7FEc",
        discription: "hmmmmmmmmmmmmmm"
    }
];
    
function seedDB(){
    // Remove campground
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed Campground");
        }
            //add a few campgrounds
            data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a Campground");
                    //create commend
                    Comment.create(
                        {
                            text: "this place is cr8",
                            author: "Homer"
                        }, function(err, comment){
                          
                            if(err){
                                console.log(err);
                            }else{
                                data.comments.push(comment);
                                data.save();
                                console.log("Comment added");
                            }
                    });
                }
            });
        });
    });
}    
    
module.exports = seedDB;