var Client = require('node-rest-client').Client;

var client = new Client();
var data1;
// direct way
//client.get("https://api.pandascore.co/matches/upcoming.json?token=xFEMHt5iIXzTaDydesV2fk01-L-YKp7OFLcZcWZJ4tav2Og-7jA", function (data, response) {
client.get("https://api.pandascore.co/matches?filter[id]=22186&token=xFEMHt5iIXzTaDydesV2fk01-L-YKp7OFLcZcWZJ4tav2Og-7jA", function (data, response) {
    // parsed response body as js object

    console.log(data);
    data = data;
});



