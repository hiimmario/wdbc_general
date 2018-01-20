var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/dbdemo");

var imgScheema = new mongoose.Schema({
    src: String,
    description: String
});

var imgmm = mongoose.model("imgMM", imgScheema);

app.get("/", function(req, res) {
    imgmm.find({}, function(err, allImages) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {images: allImages});
        }
    });
});

app.post("/", function(req, res) {
    var imgUrlObject = {
        src: req.body.imgurl,
        description: req.body.description
    };

    imgmm.create(imgUrlObject, function(err, img) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});

app.get("/addcontent", function(req, res) {
    res.render("addcontent");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/:id", function(req, res) {
    imgmm.findById(req.params.id, function(err, img) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("show", {img: img});
        }
    });
});

app.use(express.static('images'));

app.listen(3000, function() {
    console.log("server  started!");
})