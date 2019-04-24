var express = require('express')
var router = express.Router()
var Auth = require('../helpers/hash')
var Users = require('../models/users')

// List users
router.get('/', function (req, res) {
  // TODO: use middleware

  Users.find().sort('name').select({ __v: 0, _id: 0 })
    .then(result => {
      res.json({ users: result })
    })
    .catch(err => {
      res.json({ message: 'Something went wrong', error: err })
    })
})

// Create a New User
router.post('/', function (req, res) {
  Auth.hash(req.body.pass, hash => {
    var user = Users({
      email: req.body.email,
      digest: hash,
      name: req.body.name
    })

    user.save()
      .then(newUser => {
        res.json({ user: newUser })
      })
      .catch(err => {
        res.json({ message: 'Something went wrong', error: err.message })
      })
  })
})

// Update a user
// TODO: actualizar una sola cosa
router.put('/:id', function (req, res) {
  // let id = req.query.id // TODO: middleware

  Users.findOne({ id: req.params.id }, (err, result) => {
    if (result) {
      Users.updateOne({ id: req.params.id }, {
        email: req.body.email,
        digest: req.body.digest,
        name: req.body.name
      }).then((err, status) => {
        res.json({ result: 'ok' })
      })
        .catch(err => {
          console.error('Something went wrong', err)
          res.json({ message: 'Something went wrong', error: err.message })
        })
    } else {
      res.json({ errors: 'user not found' })
    }
  })
})

// Delete a user
router.delete('/:id', function (req, res) {
  // let id = req.query.id // TODO: middleware

  console.log(req.params.id)
  Users.findOne({ id: req.params.id }, (err, result) => {
    console.log(result)
    if (result) {
      Users.deleteOne({ id: req.params.id })
        .then((err, status) => {
          res.json({ result: 'ok' })
        })
        .catch(err => {
          console.error('Something went wrong', err)
          res.json({ message: 'Something went wrong', error: err })
        })
    } else {
      res.json({ errors: 'user not found' })
    }
  })
})

module.exports = router
