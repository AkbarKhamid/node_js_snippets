var request = require("request");
//  request("http://buildur.tech", function(error, response, body){
//     if(error){
//         console.log("Something went wrong");
//     } else{
//         if(response.statusCode == 200){
//             // everything is fine
//             console.log(body);
//         }
//     }
//  });
    
    console.log("Sunset in Hawaiii at ...");
request("https://bit.ly/1V1LfJJ", function(error, response, body){
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);
    }
})