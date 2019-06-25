var mongoose = require("mongoose");  // include mongoose package
mongoose.connect("mongodb://localhost/cats");   // connect it to the running mongoDB server 

var catSchema = new mongoose.Schema({   // create a template that is used when adding a new data
    name: String,
    age: Number,
    temperament: String
});


var Cat = mongoose.model("Cat", catSchema);  // make the Cat variable a mongoDB collection 
                                             // that i can use to manipulate that with mongoDB methods (ie cat.create)  
// var newCat = new Cat ({      // creating a new data that is following the cat template
//     name: "Norris",
//     age: 78,
//     temperament: "Evil"
// });

// newCat.save(function(err, cat){  // saving the new data object "mosh" to the db
//     if(err){  // checking if run into an error
//         console.log("Something went wrong");
//         console.log(err);
//     } else {  // if not notifying that the data is saved
//         console.log("Data saved");
//         console.log(cat);
//     }
// });

// creating and saving a new data at the same time

Cat.create({        // creating a new data object
    name: "Snow White",
    age: 10,
    temperament: "Bland"
},function(err, cat){  // checking if succeded or failed
    if(err){
        console.log("Something went wrong");
        console.log(err);
    } else {
        console.log("Created new cat");
        console.log(cat);
    }
});


// retrieving data from db

Cat.find({}, function(err, cat){  // passing empty object because i'm not searching for a specific cat
    if(err){
        console.log("Something went wrong");
        console.log(err);
    }else {
        console.log("Found cats...");
        console.log(cat);
    }
});