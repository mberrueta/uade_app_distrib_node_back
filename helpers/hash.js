var bcrypt = require('bcrypt'),
    salt = 10;


module.exports.hash = (pass, callback) => {
  bcrypt.hash(pass,salt)
  .then((hashedPassword) => {
    if (callback) {
      callback(hashedPassword);
    }
  });
}

module.exports.hash_compare = (pass, hash_to_compare, callback) => {
  bcrypt.compare(pass, hash_to_compare, (err, result) => {
    console.log(err, result);
    if (callback) {
      callback(result);
    }
  });
}
