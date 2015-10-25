// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var ejs = require('ejs');
var session = require('express-session');
var mongoose = require("mongoose");
var User = require('./models/user');
var db = require("./models/index");
var bcrypt = require('bcrypt');
var Request = require('./models/request');


//MIDDLEWARE
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//set session options
app.use(session({
	saveUnitialized: true,
	resave: true,
	secret: "SuperSecretCookie",
	cookie: { maxAge: 600000}
}));


app.get('/', function(req, res) {
  res.render("index");
});


//demo user
var demoUser = {
	requests: [
		{completed: false, count: 3, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }, { completed: true, count: 12, description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable." }, { completed: false, count: 8, description: "Hello I'm a prayer request"}
	]
};

//route for user's page
app.get('/:id', function(req, res) {
	if (req.params.id == "demo") {
		res.render("user-show", {demoUser: demoUser});
	} else {
		db.User.findById(req.params.id, function (err, user) {
			res.render("user-show", {user: user});

		});		
	}
  
});

//route for creating a user
app.post('/api/users', function(req, res) {
	var user = req.body;
	db.User.createSecure(user.email, user.password, function(err, user) {
		if (err) console.log(err);
		req.session.userId = user._id;
		req.session.user = user;
		console.log("user._id is: " + req.session.userId);
		console.log("user is: " + user);
		res.json(user);
	});
});

//route for check if current user
app.get('/api/current-user', function(req, res) {
	console.log("found current user");
	console.log("req.session.userId is: " + req.session.userId);
	res.json({ user: req.session.user });
});

//route for loggin out
app.get('/api/logout', function(req, res) {
	req.session.userId = null;
	req.session.user = null;
	res.json({ msg: "User logged out successfully" });
});

//route for creating a request
app.post('/api/:id/requests', function(req, res) {
	console.log(req.body);
	db.User.findById( req.params.id, function (err, user) {
		user.requests.push(req.body);
		console.log(user.requests);
	});
	db.Request.create(req.body, function(err, request) {
		console.log("new request created");
		if (err) console.log(err);
		console.log("final user with request is: " + user);
		res.json(request);
		
	});
});

app.listen(process.env.PORT || 3000, function() {
  console.log("express-heroku-starter is running on port 3000");
});

