var express          = require("express"),
    app              = express(),
    mongoose         = require("mongoose"),
    pasport          = require("passport"),
    bodyParser       = require("body-parser"),
    LocalStrategy    = require("passport-local"),
    pasportLMongoose = require("passport-local-mongoose"),
    User             = require("./models/user");
    
    
    
mongoose.connect("mongodb://localhost:27017/secretDB", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "My owne words",
    resave: false,
    saveUninitialized: false
}));
app.use(pasport.initialize());
app.use(pasport.session());

pasport.use(new LocalStrategy(User.authenticate()));
pasport.serializeUser(User.serializeUser());
pasport.deserializeUser(User.deserializeUser());

//========================================================
//           ROUTES
//========================================================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//=======================================================
//         Auth Routes
//========================================================

app.get("/register", function(req, res) {
    res.render("register");
});
// handling user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        pasport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});
//Login Routs

// Render login form
app.get("/login", function(req, res) {
    res.render("login");
});
//Login Post Route
//Middleware
app.post("/login", pasport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout",  function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running !!");
});








