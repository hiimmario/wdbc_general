var express                 = require("express");
var app = express();

var mongoose                = require("mongoose");
var bodyParser              = require("body-parser");
var passport                = require("passport");
var localStrategy           = require("passport-local");

var blog                    = require("./models/post");
var comment                 = require("./models/comment");
var user                    = require("./models/user");

var seedDB                  = require("./seeds");

var blogsRoutes             = require("./routes/blogs");
var commentsRoutes          = require("./routes/comments");
var indexRoutes             = require("./routes/index");

var expressSanitizer        = require("express-sanitizer");
var methodOverride          = require("method-override");

var flash                   = require("connect-flash");


//mongoo config
mongoose.connect("mongodb://localhost/restfulBlogApp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "mario",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//seed db at server start
//seedDB();

//middleware function - all routes receive req.user
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/blogs/:id/comments", commentsRoutes);
app.use("/blogs", blogsRoutes);

//server listens to port 3000
app.listen(3000, function() {
    console.log("server started");
});