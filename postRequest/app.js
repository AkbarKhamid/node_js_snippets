var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["tony","gary","merry","cherry","harry","potter"];

app.get("/", function(req,res){
   res.render("home"); 
});

app.post("/addfriend", function(req,res){
    var newFrined = req.body.newFrined;
    friends.push(newFrined);
   res.redirect("/friends"); 
});


app.get("/friends", function(req,res){
   res.render("friends",{friends: friends});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});