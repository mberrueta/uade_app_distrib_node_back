var MongoClient = require('mongodb').MongoClient,
    db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uade_app_distribuidas'


var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done()

  MongoClient.connect(db_url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}