var mongoose = require("mongoose");

var blog = require("./models/post");
var comment = require("./models/comment");

var data = [
    {
        title: "post1",
        image: "https://img-9gag-fun.9cache.com/photo/abMy4Eb_460s.jpg",
        body: "post 1 body"
    },
    {
        title: "post2",
        image: "https://img-9gag-fun.9cache.com/photo/aeM0d6W_460s.jpg",
        body: "post 2 body"
    },
    {
        title: "post3",
        image: "https://img-9gag-fun.9cache.com/photo/a7MyGQA_460s.jpg",
        body: "post 3 body"
    }
];

function seedDB() {
    blog.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("removed blog posts");

            data.forEach(function(post) {
                blog.create(post, function(err, newBlog) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log(newBlog);

                        comment.create(
                            {
                                text: "comment on that post",
                                author: "dummy"
                            },
                            function(err,comment) {
                                if(err) {
                                    console.log(err);
                                }
                                else {
                                    newBlog.comments.push(comment._id);
                                    newBlog.save();
                                    console.log(comment);
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;