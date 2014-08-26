//https://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 8080;
    var path = require('path');

var router = express.Router();
var bodyParser     = require('body-parser');

 
var app = express();

// config files
//var db = require('./config/db');

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
//mongoose.connect('mongodb://127.0.0.1:27017/nodetest1'); // connect to our database
mongoose.connect('mongodb://localhost:27017/nodetest1');
var Bear     = require('./app/models/bear');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (res) {
  // yay!
});
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// =============================================================================

// <-- route middleware and first route are here

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)
		bear.age = req.body.age;
		bear.color = req.body.color;
		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
		
	})
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});
	

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			bear.name =req.body.name;

			//save the bear
			bear.save(function(err){
				if(err)
					res.send(err);
				
				res.json({message:"Bear updated!"})
			});
		});
	})
	//Delete a bear
	.delete(function(req, res) {
		Bear.remove({
			_id:req.params.bear_id
		},function(err,bear){
			if(err)
				res.send(err);

			res.json({message:"Successfully deleted!"})
		});
	});


router.get('/', function (req, res) {
    res.json({message:'YAY!'});
});

app.post('/addBearContent', function (req, res) {
   
    // res.render('public/tmpl/bookings.html');
    //res.json(bookings);
    console.log("bookings");

    var bear = new Bear(); 		// create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)
	bear.email = req.body.email;
	// save the bear and check for errors
	bear.save(function(err) {
		if (err)
			res.send(err);
		//res.json({ message: 'Bear created!' });
		res.send("Success!");
	});
});

app.use('/api',router);



//Front End

app.set("view options", {
    layout: false
});
app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
    res.render('public/index.html');
});



app.listen(port);
console.log('Express server running at http://localhost:' + port);