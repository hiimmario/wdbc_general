var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("hi there");
});

app.get("/bye", function(req, res) {
    res.send("bye");
});

app.get("/dog", function(req, res) {
    res.send("wauwau");

});

app.get("/pat/:whateversingle", function(req, res) {
   res.send("single");
});

app.get("/pat/:single/:double", function(req, res) {
    res.send("double");
});

app.listen(3000, function() {
    console.log("server started");
});