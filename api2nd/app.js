var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/result", function(req, res) {
    var movieName = req.query.movieName;
    var url = "http://www.omdbapi.com/?apikey=59dc02c4&s=" + movieName;
    request(url, function(error, response, body) {

            if(!error && response.statusCode == 200) {
                var parsedData = JSON.parse(body);
                res.render("result", {parsedData: parsedData});
            }
            else {
                console.log(error);
            }
        });

});

app.listen(3000, function() {
    console.log("server started");
});