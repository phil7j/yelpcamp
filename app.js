require('dotenv').config();
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    User        = require("./models/user"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    seedDB      = require("./seeds"),
    PORT = process.env.PORT || 5000;
//requiring routes    
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelpcamp"

//Local Database    
mongoose.connect(url, { useNewUrlParser: true});
//Live Heroku Database
// mongoose.connect("mongodb://phil:johnson1@ds113853.mlab.com:13853/yelpcamp9", { useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//Insert Seed Data
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret Page Accessed!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, process.env.IP, function(){
    console.log("YelpCamp Initiated!");
});