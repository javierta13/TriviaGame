// --------------------------------------------------------------------------------------
//Server stuff

var express = require('express'),
	http = require('http'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
    redis = require('redis');


//mongoose stuff
db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/my_dee_bee');

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.

  console.log("connection success!");
});

//Create Schema
var Schema = mongoose.Schema;
var QSchema = new Schema({
    question: String,
    answer: String,
    id: Number
});

// Mongoose Model definition for questions
var Question = mongoose.model('questions', QSchema);

redisClient = redis.createClient();


redisClient.set('right', 0, function(){});
redisClient.set('wrong', 0, function(){});


// Create our Express-powered HTTP server 
// and have it listen on port 3000
app.use(express.static(__dirname +'/'));
http.createServer(app).listen(3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//make sure count is the size of the database entries at start
var count = 0;

app.get('/getQuestion', function (req, res) { 
    var q, i;
    i = count;
    
	if(count === 0)
	{
		res.json({"question": "database empty"});
	}
	else
	{
    	//queries the question based on id being 1
		Question.findOne({ id: i }, function(err, questionObject) {
        	if (err) return console.error(err);
        	console.log(questionObject);
        	q = questionObject.question;
        	i = questionObject.id;

        	//moved res.json inside function for scope
        	res.json({"question": q, "id": i});
    	});
	}
});

app.post('/postQuestion', function (req, res) { 

    var newQuestion = req.body.question;
    var newAnswer = req.body.answer;
    count += 1;
    var id = count;

    var q1 = new Question({"question":newQuestion, "answer":newAnswer, "id":id});

    // save the user
    q1.save(function (err) { 
        if (err !== null) {
            // object was not saved!
            console.log(err); }
        else{
            console.log("the object was saved!");
        }
    });


	res.json({'newQuestion': newQuestion, 'newAnswer': newAnswer});
});



app.post('/postAnswer', function (req, res) { 
	var collection = db.collection('questions');
    var cursor = collection.find();
   	var answer = req.body.answer;
   	var id = req.body.id;    
   	id = parseInt(id);
    cursor.forEach(function(Question) {

        if(Question.id === id) 
        {
        	if(Question.answer === answer) 
        	{
            	redisClient.incr('right');
            	res.json({"result": "CORRECT!"});
        	}
        	else
        	{
            	redisClient.incr('wrong');
            	res.json({"result": "WRONG"});
        	}
        }
    });
});	



app.get('/getScore', function(req, res) {
	redisClient.mget(["right", "wrong"], function (err, score) {
    	if (err !== null) {
        	console.log("ERROR: " + err);
        	return;
    	}
    	var right = score[0];
		var wrong = score[1];	
		res.json({'right': right, 'wrong': wrong});
    });
});

console.log("server is now listening");
