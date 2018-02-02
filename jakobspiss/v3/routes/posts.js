var express = require("express");
var router = express.Router({mergeParams: true});

//===================blog routes
//index route
router.get("/", function(req, res) {
    res.render("posts/index");
});

module.exports = router;