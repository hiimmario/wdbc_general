var request = require("request");
request("http://googasdfale.de", function(error, response, body) {

    if(error) {
        console.log(error);
    }
    else if(response.statusCode == 200) {
        console.log(body);
    }

});