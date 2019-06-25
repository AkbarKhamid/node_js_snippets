var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

    var camps = [
        {name:"Biggy Boston", image: "https://bit.ly/2rw7uyw"},
        {name:"Brighten Sky's camp", image: "https://bit.ly/2G31jHp"},
        {name:"Holly Camp", image: "https://bit.ly/2IvdNwW"}
    ];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds", {camps: camps});
});

app.get("/campgrounds/new", function(req,res){
   res.render("new"); 
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    camps.push(newCamp);
   res.redirect("/campgrounds");
});

app.get("*", function(req, res) {
    res.send("Sorry, this page is not available yet :/");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});