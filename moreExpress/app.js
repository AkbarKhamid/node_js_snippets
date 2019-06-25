var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/fellinlovewith/:something", function(req, res) {
    var thing = req.params.something;
    res.render("love.ejs", {thingVar: thing}); 
});

app.get("/posts", function(req,res){
   var posts = [
      {title: "Hello world program ..", author: "codeBoy"},
      {title: "have you guys seen the Black Panther ..", author: "FilmBoy"},
      {title: "I cooked delicious meal today, yummy ..", author: "CookBoy"}
      ];
      
      res.render("posts.ejs", {posts: posts});
});


app.get("*", function(req, res){
   res.send("Sorry, this page is not available"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running"); 
});