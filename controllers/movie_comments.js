var express = require('express')
var router = express.Router()
var MovieComments = require('../models/movie_comments')

// List comments by movie
router.get('/:imdb_id', function (req, res) {
  // TODO: use middleware
  let userId = req.query.user_id

  Promise.all([
    MovieComments.find({ imdb_id: req.params.imdb_id, user_id: userId }).sort('-date'),
    MovieComments.find({ imdb_id: req.params.imdb_id, user_id: { '$ne': userId } }).sort('-date')
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
  var comment = MovieComments({
    user_id: req.body.user_id, // TODO: middleware
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
