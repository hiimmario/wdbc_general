var express         = require("express");
var router          = express.Router({mergeParams: true});

//main route
router.get("/", function(req, res) {
    res.redirect("/posts");
});

module.exports = router;