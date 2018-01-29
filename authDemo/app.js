var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    user                    = require("./models/user"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret:  "mario",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//=================
//routes

//index
app.get("/", function(req, res) {
    res.render("home");
});

//show signup form
app.get("/register", function(req, res) {
    res.render("register");
});

//handling user signup
app.post("/register", function(req, res) {

    user.register(new user({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
        }
    });
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

app.get("/login", function(req,res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req,res) {

});

app.get("/logout", function(req,res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000, function() {
    console.log("server started");
});