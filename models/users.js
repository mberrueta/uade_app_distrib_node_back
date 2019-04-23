var mongoose = require('mongoose')
var uuid = require('node-uuid')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: { type: String, default: uuid.v1 },
  email: { type: String, required: true, maxlength: 50 },
  digest: { type: String, required: true, maxlength: 60, minlength: 8 },
  name: { type: String, required: true, maxlength: 50 }
})

module.exports = mongoose.model('User', UserSchema)
