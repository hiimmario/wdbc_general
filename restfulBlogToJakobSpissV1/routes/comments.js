var express = require("express");
var router = express.Router({mergeParams: true});

var comment = require("../models/comment");
var blog = require("../models/post");

var middleware = require("../middleware");

//================comments route

// comments new get
router.get("/new", middleware.isLoggedIn, function(req, res) {
    blog.findById(req.params.id, function(err, blog) {
        if(err) {
            consolole.log(err);
        }
        else {
            res.render("comments/new", {blog: blog});
        }
    });
});

//comments edit route
router.get("/:commentId/edit", middleware.checkCommentOwnership, function(req, res) {
    comment.findById(req.params.commentId, function(err, foundComment) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/edit", {blogId: req.params.id, comment: foundComment});
        }
    });
});

//comments put comment edit
router.put("/:commentId", middleware.checkCommentOwnership, function(req, res) {
    comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

router.delete("/:commentId", middleware.checkCommentOwnership, function(req, res) {
    comment.findByIdAndRemove(req.params.commentId, function(err) {
        if(err){
            console.log(err);
        }
        else {
            req.flash("success", "Comment deleted!");
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// comments create post
router.post("/", middleware.isLoggedIn, function(req, res) {

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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    blog.comments.push(comment._id);
                    blog.save();
                    res.redirect("/blogs/" + blog._id);
                }
            });
        }
    });
});

module.exports = router;