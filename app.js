var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    db = require('./db')
    port = process.env.PORT || 9090;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send({result: 'happy to be here'});
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  }
});

module.exports = app;
