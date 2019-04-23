var express = require('express')
var router = express.Router()
var Auth = require('../helpers/hash')
var Key = require('../key')
var JWT = require('jsonwebtoken')
var Users = require('../models/users')

// Signing
router.post('/signin', function (req, res) {
  Users
    .findOne({ email: req.body.email }, (err, result) => {
      Auth.hash_compare(req.body.pass, result.digest, match => {
        if (result && match) {
          let token = JWT.sign({ user_id: result.id, email: result.email, user_name: result.name }, Key.tokenKey)
          res.status(200).json({ user_id: result.id, email: result.email, user_name: result.name, token })
        } else {
          res.status(403).json({ message: 'Invalid Password/Username' })
        }
      })
    })
})

module.exports = router
