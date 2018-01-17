var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/filw/:thing", function(req, res) {
    var thing = req.params.thing;

    res.render("filw", {thingvar: thing});
});

app.get("/", function(req, res) {
    res.render("home");
});

app.listen(3000, function() {
    console.log("server listening");
});