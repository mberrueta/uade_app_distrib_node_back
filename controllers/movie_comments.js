var express = require('express')
var router = express.Router()
var MovieComments = require('../models/movie_comments')
var Users = require('../models/users')
var Arrays = require('../helpers/array')

// List comments by movie, allow unsigned user
router.get('/:imdb_id', function (req, res) {
  let userId = req.user ? req.user.id : '00000000-0000-0000-0000-00000000'

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
        select: { __v: 0, _id: 0, digest: 0 }
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

// List my comments, only signed user
router.get('/', function (req, res) {
  if (req.user) {
    MovieComments.find({ user: { _id: req.user._id } })
      .sort('imdb_title')
      .select({ __v: 0, _id: 0 })
      .then(results => {
        let list = Arrays.groupBy(results, 'imdb_title')
        res.json({ comments: list })
      })
      .catch(err => {
        res.json({ message: 'Something went wrong', error: err })
      })
  } else {
    res.json({ errors: 'please sing in' })
  }
})

// Create a New Movie Rating & Comment, only signed user
router.post('/', function (req, res) {
  if (req.user) {
    Users.findOne({ id: req.user.id }, (err, user) => {
      if (user) {
        var comment = MovieComments({
          user: user,
          imdb_id: req.body.imdb_id,
          imdb_title: req.body.imdb_title,
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
  } else {
    res.json({ errors: 'please sing in' })
  }
})

// Update a rating & comment, only signed user
router.put('/:id', function (req, res) {
  if (req.user) {
    MovieComments.findOne({ id: req.params.id, user: req.user._id }, (err, result) => {
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
  } else {
    res.json({ errors: 'please sing in' })
  }
})

// Delete a rating & comment, only signed user
router.delete('/:id', function (req, res) {
  if (req.user) {
    MovieComments.findOne({ id: req.params.id, user: req.user._id }, (err, result) => {
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
  } else {
    res.json({ errors: 'please sing in' })
  }
})

module.exports = router
