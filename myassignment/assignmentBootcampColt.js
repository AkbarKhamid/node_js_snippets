var express = require("express");
var app = express();

app.get("/", function(req,res){
   res.send("Hi there, welcome to my assignment"); 
});

app.get("/speaks/:animal", function(req,res){
    // refactoring the if else option
    
    var sound = {
        pig: "oink",
        dog: "wof, wof",
        cat: "I know you hate me",
        jellyfish: "..."
    };
    
   var animal = req.params.animal.toLowerCase();
   var action = sound[animal];
   
   // if else option
//   if(animal === "pig"){
//       action = "oink";
//   }
//   else if(animal === "dog"){
//       action = "woof";
//   }
//   else if (animal === "cat"){
//       action = "meow";
//   }
  
  res.send("The " + animal + " speaks " + action);
});


app.get("/repeat/:word/:times", function(req,res){
   var word = req.params.word;
   var times = Number(req.params.times);
   var repeated = "";
  for(var i = 1;i <= times ;i++){
      repeated += word + " ";
  }
   
});

app.get("*", function(req,res){
   res.send("Sorry , page not found, What are you doing with your life"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});

