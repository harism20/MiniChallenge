var express        = require('express');
var app            = express();

var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose        = require("mongoose");


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
routes = require('./routes/mhs')(app);

mongoose.connect('mongodb://localhost/mhs', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(8080);
console.log('Im listening on port 8080');


app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});


app.get('/update', function(req, res) {
  res.sendfile('./public/update.html');
});