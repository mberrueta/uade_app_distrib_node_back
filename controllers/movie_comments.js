var express = require('express')
var router = express.Router()
var MovieComments = require('../models/movie_comments')
var Users = require('../models/users')

// List comments by movie
router.get('/:imdb_id', function (req, res) {
  let userId = req.user ? req.user.id : "00000000-0000-0000-0000-00000000"

  Promise.all([
    MovieComments.find({ imdb_id: req.params.imdb_id, user_id: userId })
      .sort('-date')
      .select({ __v: 0, _id: 0 })
      .populate({
        path: 'user',
        select: { name: 1, id: 1, email: 1, _id: 0 }
      }),
    MovieComments.find({ imdb_id: req.params.imdb_id, user_id: { '$ne': userId } })
      .sort('-date')
      .select({ __v: 0, _id: 0 })
      .populate({
        path: 'user',
        select: { name: 1, id: 1, email: 1, _id: 0 }
      })
  ])
    .then(results => {
      const [myComments, allComments] = results
      res.json({ comments: myComments.concat(allComments) })
    })
    .catch(err => {
      res.json({ message: 'Something went wrong', error: err })
    })
})

// Create a New Movie Rating & Comment
router.post('/', function (req, res) {
  Users.findOne({ id: req.body.user_id }, (err, user) => {
    if (user) {
      var comment = MovieComments({
        user: user, // TODO: middleware
        imdb_id: req.body.imdb_id,
        comment: req.body.comment,
        stars: req.body.stars
      })

      comment.save()
        .then(newComment => {
          res.json({ comment: newComment })
        })
        .catch(err => {
          res.json({ message: 'Something went wrong', error: err.message })
        })
    } else {
      res.json({ errors: 'user not found' })
    }
  })
})

// Update a rating & comment
router.put('/:id', function (req, res) {
  let userId = req.query.user_id // TODO: middleware

  MovieComments.findOne({ id: req.params.id, user_id: userId }, (err, result) => {
    if (result) {
      MovieComments.updateOne({ id: req.params.id }, {
        comment: req.body.comment,
        stars: req.body.stars
      }).then((err, comment) => {
        res.json({ result: 'ok' })
      })
        .catch(err => {
          res.json({ message: 'Something went wrong', error: err.message })
        })
    } else {
      res.json({ errors: 'rating not found' })
    }
  })
})

// Delete a rating & comment
router.delete('/:id', function (req, res) {
  let userId = req.query.user_id // TODO: middleware

  MovieComments.findOne({ id: req.params.id, user_id: userId }, (err, result) => {
    if (result) {
      MovieComments.deleteOne({ id: req.params.id })
        .then((err, comment) => {
          res.json({ result: 'ok' })
        })
        .catch(err => {
          res.json({ message: 'Something went wrong', error: err })
        })
    } else {
      res.json({ errors: 'rating not found' })
    }
  })
})

module.exports = router
