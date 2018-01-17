var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("main");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    /*
    var sound = "";

    if(animal === "pig") {
        sound = "oink";
    }
    else if (animal === "cow") {
        sound = "muh";
    }
    else if (animal === "dog") {
        sound = "wauwau";
    }
    else {
        sound = "page not found";
    }
    */
    var sounds = {
        dog: "wauwau",
        pig: "oink",
        cow: "muh"
    };

    var sound = sounds[animal];

    res.send(sound);
});

app.get("/repeat/:tosay/:count", function (req, res) {
    var tosay = req.params.tosay;
    var count = req.params.count;
    var result = "";

    for(var i = 0; i < count; i++) {
        result += (tosay + " ");
    }
    res.send(result);
});

app.get("*", function(req, res) {
    res.send("page not found");
});

app.listen(3000, function() {
    console.log("server started");
});