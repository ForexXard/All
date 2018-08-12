var express          = require("express"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app              = express(),
    mongoose         = require("mongoose"),
    bodyParser       = require("body-parser");
    
//APP CONFIG
mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("publick"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFULL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

//new route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// create route
app.post("/blogs", function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err)
        } else {
            //redirect
            res.redirect("/blogs");
        }
    });
});

// Show Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("edit", {blog: blog});
        }
    });
});

// Update Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs")
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Delete Route
app.delete("/blogs/:id", function(req, res){
    //Destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running");
});