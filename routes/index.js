var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//root route
router.get("/", function(req,res){
    res.render("landing");
});




//===========
//AUTH ROUTES
//===========

//show register form
router.get("/register", function(req,res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req,res){
    var newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatar: req.body.avatar,
        email: req.body.email
    });

    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Successfully Signed Up! Welcome to YelpCamp " + user.username + ".")
            res.redirect("/campgrounds");
        });
    });
});

//show login form

router.get("/login", function(req,res){
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect:"/login",
    failureFlash: true,
    successFlash: "Welcome"
}),function(req,res){
    
}); 

//logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});

//Users Profile Route

router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "Something went wrong.")
            return res.redirect("/")
        }
        Campground.find().where('author.id').equals(foundUser._id).exec(function(err,campgrounds){
            if(err){
                req.flash("error", "Something went wrong.")
               return res.redirect("/")
            }
            res.render("users/show", {user: foundUser, campgrounds: campgrounds})
        })
        
    });

});



module.exports = router;