// Dependencies below
var logger = require('morgan');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
// requiring note and article models
var Article = require("./models/Articles.js");

// this is for heroku deployment
var PORT = process.env.PORT || 3002


// initialize express
var app = express();


// logging using Morgan
app.use(logger('dev'));
app.use(bodyParser.json());
// uses body parser with the app
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Make public a static dir
app.use(express.static('public'));

// var dbConnect =
//     process.env.MONGODB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/ReactMovieNews';

// // mongoDB_URI : mongodb://heroku_f727w5fr:epf9p9fd2brsmmfop5246
// //vu6r3@ds115583.mlab.com:15583/heroku_f727w5fr

// // connect to the mongo db
// mongoose.connect(dbConnect, 
//   {useMongoClient: true }
// );

// var db = mongoose.connection;

// // any mongoose errors
// db.on('error', function(error) {
//   console.log('Mongoose Error: ', error)
// });
// // success messages 
// db.on('open', function() {
//   console.log('Mongoose connection successful');
// });

// get, post, delete routes
app.get('/', function (req, res) {
    res.sendFile('./public/index.html');
})

app.get('/api/saved', function (req, res) {
    Article.find({})
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

app.post('/api/saved', function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    newArticle.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

app.delete('/api/saved/:id', function (req, res) {
    Article.find({'_id': req.params.id}).remove()
        .exec(function (err, doc) {
            res.send(doc);
        });
});

// app listen on port 3000
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
