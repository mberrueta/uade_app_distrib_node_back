var mongoose = require('mongoose')
var uuid = require('node-uuid')
var Schema = mongoose.Schema

var MovieCommentSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  imdb_id: { type: String, required: true },
  imdb_title: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, trim: true, maxlength: 200 },
  stars: { type: Number, min: 1, max: 5, default: 3 },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MovieComment', MovieCommentSchema)
