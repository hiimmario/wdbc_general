var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var expressSanitizer = require("express-sanitizer");

// app config
mongoose.connect("mongodb://localhost/restfulBlogApp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var blog = mongoose.model("blog", blogSchema);


// restful routes
// index
// new
// create

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
            res.render("index", {blogs: blogs});
        }
    });
});

// new route
app.get("/blogs/new", function(req, res) {
    res.render("new");
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
    blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("show", {blog: foundBlog});
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
            res.render("edit", {blog: foundBlog});
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


app.listen(3000, function() {
    console.log("server started");
});