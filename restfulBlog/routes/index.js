var express         = require("express");
var router          = express.Router({mergeParams: true});

var passport        = require("passport");
var user            = require("../models/user");

//main route
router.get("/", function(req, res) {
    res.redirect("/blogs");
});

//==================auth routes

router.get("/register", function(req, res) {
    res.render("register");
});

//handling registers
router.post("/register", function(req, res) {
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

//login route
router.get("/login", function(req,res) {
    res.render("login");
});

//handling logins
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res){

});

//handling logut
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/blogs");
});

module.exports = router;