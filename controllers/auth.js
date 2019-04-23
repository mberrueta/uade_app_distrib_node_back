var express = require('express'),
    router = express.Router(),
    Auth = require('../helpers/hash'),
    Key = require('../key'),
    JWT = require('jsonwebtoken');
    Users = require('../models/users');

// Signin
router.post('/signin', function(req, res) {
  Users
    .findOne({email: req.body.email}, (err, result) => {
      Auth.hash_compare(req.body.pass, match => {
        console.log("res:", result, "err:", err, "match:", match)
        if(result && match){
            let token = JWT.sign({user_id: result.id, email: result.email, user_name: result.name}, Key.tokenKey);
            res.status(200).json({user_id: result.id, email: result.email, user_name: result.name, token})
        }
        else{
            res.status(403).json({message:'Invalid Password/Username'});
        }
    });
  });
});

module.exports = router
