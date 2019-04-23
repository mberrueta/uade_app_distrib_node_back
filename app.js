var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    // db = require('./db'),
    url_db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uade_app_distribuidas',
    mongoose = require('mongoose'),
    port = process.env.PORT || 9090;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/movie-comments', require('./controllers/movie_comments'))
mongoose.connect(url_db);

app.get('/', function(req, res) {
  res.send({result: 'happy to be here'});
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});

module.exports = app;
