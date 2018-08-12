var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });



//POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//User - email, name
var userSchema = new mongoose.Schema({
    email: String(),
    name: String(),
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "Papino@abv.bg",
//     name: "Pafincho"
// });

// newUser.posts.push({
//     title: "The stuff",
//     content: "yougurt"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });
// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "the Thing",
//     content: "Baby Boy"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });

User.findOne({name: "Pafincho"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        user.posts.push({
            title: "Learn coding faster",
            content: "Need more time to learn"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});