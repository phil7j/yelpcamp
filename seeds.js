var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
      name: "Clouds Rest",
      image: "https://farm3.staticflickr.com/2921/14140066335_45054e256a.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque iaculis diam congue viverra. Vivamus egestas a tellus ut dignissim. Quisque venenatis lorem urna, consectetur imperdiet erat luctus ut. Nullam iaculis viverra nunc eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel auctor orci. Aliquam erat volutpat. Donec at consectetur augue, ut tincidunt nisi. Praesent sodales massa nec condimentum suscipit. Pellentesque lacinia aliquet neque eu volutpat. Suspendisse et quam aliquet dui semper vestibulum. Vivamus molestie quis nisl ut consequat."
    },
     {
      name: "Oceanside Park",
      image: "https://farm6.staticflickr.com/5069/5606463561_3c8aeb2856.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque iaculis diam congue viverra. Vivamus egestas a tellus ut dignissim. Quisque venenatis lorem urna, consectetur imperdiet erat luctus ut. Nullam iaculis viverra nunc eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel auctor orci. Aliquam erat volutpat. Donec at consectetur augue, ut tincidunt nisi. Praesent sodales massa nec condimentum suscipit. Pellentesque lacinia aliquet neque eu volutpat. Suspendisse et quam aliquet dui semper vestibulum. Vivamus molestie quis nisl ut consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque iaculis diam congue viverra. Vivamus egestas a tellus ut dignissim. Quisque venenatis lorem urna, consectetur imperdiet erat luctus ut. Nullam iaculis viverra nunc eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel auctor orci. Aliquam erat volutpat. Donec at consectetur augue, ut tincidunt nisi. Praesent sodales massa nec condimentum suscipit. Pellentesque lacinia aliquet neque eu volutpat. Suspendisse et quam aliquet dui semper vestibulum. Vivamus molestie quis nisl ut consequat."
    },
     {
      name: "Green Lake",
      image: "https://farm7.staticflickr.com/6195/6088365014_b4d71af6b8.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque iaculis diam congue viverra. Vivamus egestas a tellus ut dignissim. Quisque venenatis lorem urna, consectetur imperdiet erat luctus ut. Nullam iaculis viverra nunc eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel auctor orci. Aliquam erat volutpat. Donec at consectetur augue, ut tincidunt nisi. Praesent sodales massa nec condimentum suscipit. Pellentesque lacinia aliquet neque eu volutpat. Suspendisse et quam aliquet dui semper vestibulum. Vivamus molestie quis nisl ut consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque iaculis diam congue viverra. Vivamus egestas a tellus ut dignissim. Quisque venenatis lorem urna, consectetur imperdiet erat luctus ut. Nullam iaculis viverra nunc eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel auctor orci. Aliquam erat volutpat. Donec at consectetur augue, ut tincidunt nisi. Praesent sodales massa nec condimentum suscipit. Pellentesque lacinia aliquet neque eu volutpat. Suspendisse et quam aliquet dui semper vestibulum. Vivamus molestie quis nisl ut consequat."
    }
    ];
    
function seedDB(){
    //Remove All Campgrounds
Campground.deleteMany({}, function(err){
   if(err){
    console.log(err);
   } 
       console.log("Removed Campgrounds!");

Comment.deleteMany({}, function(err){
    if(err){
        console.log(err);
    }
      console.log("Removed Comments!!");
})
   
   //Add a few campgrounds
data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Added Seed Camp");
            //create a comment
            Comment.create({
                text: "This place is great, but I wish there was internet",
                author: "Homer"
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                campground.comments.push(comment);
                campground.save();
                }
            });
        }
     });
    });

   });
  }



//Add a few commentts
module.exports = seedDB;