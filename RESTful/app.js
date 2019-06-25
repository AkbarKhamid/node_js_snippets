var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();
    
// APP SETUP    
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


// post {
//     title,
//     image,
//     body (main text),
//     createdDate
// }

// SCHEMA SETUP

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now()}
});

var post = mongoose.model("post", postSchema);


// ROUTES

// INDEX ROUTE
app.get("/", function(req, res){
   res.redirect("/posts"); 
});

app.get("/posts", function(req, res){
    post.find({}, function(err, foundPosts){
        if(err){
            console.log("Something went wrong");
        } else {
            res.render("index", {posts: foundPosts});      
        }
    });
});

// NEW ROUTE

app.get("/posts/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE

app.post("/posts", function(req, res){
    post.create(req.body.post, function(err, newPost){
        if(err){
            console.log("Error happened!");
        } else{
            res.redirect("/posts");
        }
    });
});

//  SHOW ROUTE
app.get("/posts/:id", function(req, res) {
   post.findById(req.params.id, function(err, foundPost){
       if(err){
           res.redirect("/");
       }else{
           res.render("show", {post: foundPost});
       }
   }) ;
});

// EDIT ROUTE   (gets the desired post by id and passes is to edit form)
app.get("/posts/:id/edit", function(req, res){      // make a new url to submit new update(s)
    post.findById(req.params.id, function(err, foundPost){ // use findById mongoose method to get the data for db
        if(err){
            res.send("<h1>Something went wrong!!!</h1>");
        } else {
            res.render("edit", {post: foundPost});  // and send it to the form to update
        }
    });
    
});

// UPDATE ROUTE (which receives the data from the edit form and updates and redirects back to show page)
app.put("/posts/:id", function(req, res){   // receive request from the edit form
   post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){ // use findByIdAndUpdate method
      if(err){
          res.send("<h1>Something went wrong! We are up and 'fixing'!</h1>")
      } else {
          res.redirect("/posts/" + req.params.id);  // after updating using the mongoose method, redirect back to show page
      }
   });
});

// DELETE ROUTE

app.delete("/posts/:id", function(req, res){
   post.findByIdAndDelete(req.params.id, function(err){
       if(err){
           res.send("<h1>Something went wrong! We are up and 'fixing'!</h1>")
       } else{
           res.redirect("/posts");
       }
   }) 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
})