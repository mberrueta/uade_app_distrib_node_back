var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var MovieCommentSchema = new Schema({
  id: { type: String, default: uuid.v1},
  imdb_id: String,
  user_id: String,
  comment: String,
  stars: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MovieComment', MovieCommentSchema);
