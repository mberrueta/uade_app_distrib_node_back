var Bcrypt = require('bcrypt');
var Salt = 10;
var JWT = require('jsonwebtoken');
var User = require('../models/users')
var Key = require('../key')

module.exports.hash = (pass, callback) => {
  Bcrypt.hash(pass, Salt)
  .then((hashedPassword) => {

    console.log(hashedPassword)
    if (callback) {
      callback(hashedPassword);
    }
  });
}

module.exports.hash_compare = (pass, hash_to_compare, callback) => {
  Bcrypt.compare(pass, hash_to_compare, (err, result) => {
    if (callback) {
      callback(result);
    }
  });
}

module.exports.jwt_user = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    JWT.verify(token, Key.tokenKey, function (err, payload) {
      if (payload) {
        User.findOne({id: payload.user_id})
          .then(user => {
            req.user=user
            next()
          })
      } else {
        next()
      }
    })
  } catch(e){
    next()
  }
}
