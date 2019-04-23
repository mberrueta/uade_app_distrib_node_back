var bcrypt = require('bcryptjs')

module.exports.hash = (pass, callback) => {
  bcrypt.hash(pass,10)
  .then((hashedPassword) => {
    if (callback) {
      callback(hashedPassword);
    }
  });
}

module.exports.auth = (email, pass, callback) => {

}