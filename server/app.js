var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
mongoose.connect('localhost:/27017/test');


var ourSchema = mongoose.Schema({
    name: String,
    location: String
}); //end ourSchema

var ourModel = mongoose.model('ourModel', ourSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// -- spin up server -- //
app.listen(8080, 'localhost', function(req, res) {
    console.log('listening on 8080');
}); //end spin up server

// -- base url -- //
app.get('/', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
}); //end base url

app.get('/getRecords', function(req, res) {
    // get and send back all the things
    ourModel.find().then(function(data) {
        res.send(data);
    }); //end find
}); //end getRecords

app.post('/testPost', function(req, res) {
    console.log('req.body.name: ' + req.body.name);
    // retrieved the req.body
    // putting it into an object to be saved in the db
    var recordToAdd = {
        name: req.body.name,
        location: req.body.location
    };
    // create new record
    var newRecord = ourModel(recordToAdd);
    newRecord.save();
}); // end testPost
