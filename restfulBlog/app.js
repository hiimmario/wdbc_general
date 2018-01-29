var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var expressSanitizer = require("express-sanitizer");

var passport = require("passport");
var localStrategy = require("passport-local");

var user = require("./models/user");

//passport configuration
app.use(require("express-session")({
    secret: "mario",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


var blog = require("./models/post");
var comment = require("./models/comment");
var seedDB = require("./seeds");

seedDB();

// app config
mongoose.connect("mongodb://localhost/restfulBlogApp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// index route
app.get("/blogs", function(req, res) {
    blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("blogs/index", {blogs: blogs});
        }
    });
});

//==================auth routes
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new user({username: req.body.username});
    var password = req.body.password;

    user.register(newUser, password, function(err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/blogs");
        });
    });
});

// new route
app.get("/blogs/new", function(req, res) {
    res.render("blogs/new");
});

// create route
app.post("/blogs", function(req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body);

    blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(newBlog);
            res.redirect("/blogs");
        }
    });
});


// show route
app.get("/blogs/:id", function(req, res) {
    blog.findById(req.params.id).populate("comments").exec(function(err, blog) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("blogs/show", {blog: blog});
        }
    });
});

// edit route
app.get("/blogs/:id/edit", function(req, res) {

    blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("blogs/edit", {blog: foundBlog});
        }
    });
});

// update route
app.put("/blogs/:id", function(req ,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});



// delete route
app.delete("/blogs/:id", function(req, res) {
    blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs");
        }
    })
});


// comments new get
app.get("/blogs/:id/comments/new", function(req, res) {
    blog.findById(req.params.id, function(err, blog) {
        if(err) {
            consolole.log(err);
        }
        else {
            res.render("comments/new", {blog: blog});
        }
    });
});

// comments create post
app.post("/blogs/:id/comments", function(req, res) {

    blog.findById(req.params.id, function(err, blog) {
        if(err) {
            consolole.log(err);
        }
        else {
            comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                }
                else {
                    blog.comments.push(comment._id);
                    blog.save();
                    res.redirect("/blogs/" + blog._id);
                }
            });
        }
    });
});





app.listen(3000, function() {
    console.log("server started");
});