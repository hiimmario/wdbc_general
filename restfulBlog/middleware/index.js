var comment = require("../models/comment");
var blog = require("../models/post");

var middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    // forwards flash object to next
    req.flash("error", "Please log in first!");
    res.redirect("/login");
};


middlewareObject.checkPostOwnership = function (req, res, next) {
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
                     req.flash("error", "You don't have the permission to do that!");
                     res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
};


middlewareObject.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        comment.findById(req.params.commentId, function(err, foundComment) {
            if(err) {
                console.log(err);
            }
            else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
};

module.exports = middlewareObject