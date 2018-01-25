var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var cat = mongoose.model("cat", catSchema);

// store cat into db using mongoose

// var george = new cat({
//     name: "othercat",
//     age: 10,
//     temperament: "more grumpy"
// });
//
// george.save(function(err, cat) {
//     if(err) {
//         console.log(error);
//     }
//     else {
//         console.log("saved");
//         console.log(cat);
//     }
// });

cat.create({
    name: "last cat",
    age: 15,
    temperament: "shit as always"
}, function(err, cat) {
    if(err) {
        console.log(error);
    }
    else {
        console.log(cat);
    }
});




// read all cats with mongoose

cat.find(function(error, cats) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(cats);
    }
});

