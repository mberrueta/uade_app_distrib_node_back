var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var cors = require('cors')
var urlDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uade_app_distribuidas'
var mongoose = require('mongoose')
var port = process.env.PORT || 9090

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/movie-comments', require('./controllers/movie_comments'))
app.use('/users', require('./controllers/users'))
app.use('/auth', require('./controllers/auth'))
mongoose.connect(urlDB)

app.get('/', function (req, res) {
  res.send({ result: 'happy to be here' })
})

app.listen(port, function () {
  console.log('app listening on port ' + port)
})

module.exports = app
