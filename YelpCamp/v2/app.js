var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"), 
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema SETUP

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campModel = mongoose.model("camp", campSchema);

//  campModel.create({  // create a new campgrounds
     
//     name:"Brighten Sky's camp",
//     image: "https://bit.ly/2G31jHp"
 
//  }, function(err, allCamps){
//      if(err){
//          console.log("Now working :(");
//          console.log(err);
//      } else{
//          console.log("All camps are in the DB");
//         console.log(allCamps);
//      }
//  });

    // var camps = [
    //     {name:"Biggy Boston", image: "https://bit.ly/2rw7uyw"},
    //     {name:"Brighten Sky's camp", image: "https://bit.ly/2G31jHp"},
    //     {name:"Holly Camp", image: "https://bit.ly/2IvdNwW"}
    // ];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    campModel.find({}, function(err, allCamps){  // find the data that is following campModel and get it from DB
       if(err){
           console.log(err);
       } else{
          res.render("index", {camps: allCamps});  // and if succeds, pass it to the campgrounds.ejs     
       }
    });
    
});

app.get("/campgrounds/new", function(req,res){
   res.render("new"); 
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;    // getting the data called "name" in html form
    var image = req.body.image;  // getting the data called "image" in html form
    var description = req.body.description;   // getting the data calleed "descr" in html form
    
    var newCamp = {
        name: name,
        image: image,
        description: description
    };
    
   campModel.create( newCamp , function(err, newlyCreated){ //and pass the object to the db 
       if(err){
           console.log("Something went wrong");
           console.log(err);
       } else {
          
            res.redirect("/campgrounds");     // after all redirect user to the /campgrounds page
       }
   }); 
  
});

app.get("/campgrounds/:id", function(req, res) {
    campModel.findById(req.params.id, function(err, foundCamp){ // get the campground by its id using params
        if(err){
            console.log(err);
        } else{
            res.render("show", {camp: foundCamp}); // and pass it to show.ejs
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});