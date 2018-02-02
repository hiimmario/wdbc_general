var express                 = require("express");
var app = express();

var postsRoutes             = require("./routes/posts");
var indexRoutes             = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/posts"));

app.use("/", indexRoutes);
app.use("/posts", postsRoutes);

//server listens to port 3000
app.listen(3000, function() {
    console.log("server started");
});