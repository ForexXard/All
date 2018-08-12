var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo2", { useNewUrlParser: true });
var Post = require("./models/post");
var User = require("./models/user");



//User - email, name


Post.create({
    title: "How asdto cook burger45",
    content: "555555"
}, function(err, post){
    User.findOne({email: "bob@abv.bg"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                }else {
                    console.log(data);
                  }
            });
        }
    });
});

// User.create({
//     email: "bob@abv.bg",
//     name: "Bob Bobov"
// });

//Find user
// User.findOne({email: "bob@abv.bg"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });
//find all post for that user