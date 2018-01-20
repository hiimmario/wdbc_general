var express = require("express");
var app = express();
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var images = [
    {src: "1.jpg"},
    {src: "2.jpg"},
    {src: "3.jpg"}
];

app.get("/", function(req, res) {
   res.render("index", {images: images});
});

app.post("/", function(req, res) {
    var imgUrlObject = {src: req.body.imgurl};
    images.unshift(imgUrlObject);
    res.redirect("/");
});

app.get("/addcontent", function(req, res) {
    res.render("addcontent");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.use(express.static('images'));

app.listen(3000, function() {
    console.log("server  started!");
})