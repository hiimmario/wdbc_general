var express = require("express");
var router = express.Router({mergeParams: true});

var blog = require("../models/post");

//middleware function - checks for user if logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//===================blog routes
//index route
router.get("/", function(req, res) {
    blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("blogs/index", {blogs: blogs});
        }
    });
});

// new route
router.get("/new", isLoggedIn, function(req, res) {
    res.render("blogs/new");
});

// create route
router.post("/", isLoggedIn, function(req, res) {

    var title = req.body.blog.title;
    var image = req.body.blog.image;
    var body = req.sanitize(req.body.blog.body);
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newPost = {title: title, image: image, body: body, author: author};

    blog.create(newPost, function(err, newBlog) {
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
router.get("/:id", function(req, res) {
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
router.get("/:id/edit", checkPostOwnership, function(req, res) {
    blog.findById(req.params.id, function(err, foundBlog) {
        res.render("blogs/edit", {blog: foundBlog});
    });
});

function checkPostOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        blog.findById(req.params.id, function(err, foundBlog) {
            if(err) {
                console.log(err);
            }
            else {
                if(foundBlog.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
}

// update route
router.put("/:id", checkPostOwnership, function(req ,res) {
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
router.delete("/:id", checkPostOwnership, function(req, res) {
    blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs");
        }
    })
});

module.exports = router;