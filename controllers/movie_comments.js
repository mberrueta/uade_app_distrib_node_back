var express = require('express'),
    router = express.Router(),
    MovieComments = require('../models/movie_comments');

// List comments by movie
router.get('/', function(req, res) {
  //TODO: use middleware
  user_id = req.params.user_id;

  //TODO: add my comments at top
  MovieComments.find({imdbID: req.params.imdb_id})
               .then(
                 (comments) => {
                    res.json({comments: comments})
                 }
               )
});

// Create a New Movie Rating & Comment
router.post('/', function(req, res) {
  var comment = MovieComments({
    user_id: req.body.user_id, // TODO: middleware
    imdb_id: req.body.imdb_id,
    comment: req.body.comment,
    stars: req.body.stars
  });

  comment.save()
         .then(
           (new_comment) => {
             res.json({comment: new_comment});
           }
         )
});

// Update a rating & comment
router.put('/:id', function(req, res) {
  let user_id = req.body.user_id; // TODO: middleware

  console.log(req.params.id)
  MovieComments.findOne({id: req.params.id}, (err, result) => {
    console.log(result)
    if(result) {
      if (result.user_id === user_id) {
        comment = req.body.comment;
        stars = req.body.stars;
        MovieComments.update({id: req.params.id}, {comment: comment, stars: stars}, (err, comment) => {
          res.json({result: 'ok'});
        })
      }
      else{
        res.json({errors: "you are not able to update this rating"});
      }
    }
    else
    {
      res.json({errors: "rating not found"});
    }
  })
});

// Delete a rating & comment
router.delete('/:id', function(req, res) {
  let user_id = req.body.user_id; // TODO: middleware

  console.log(req.params.id)
  MovieComments.findOne({id: req.params.id}, (err, result) => {
    console.log(result)
    if(result) {
      if (result.user_id === user_id) {
        MovieComments.deleteOne({id: req.params.id}, (err, comment) => {
          res.json({result: 'ok'});
        })
      }
      else{
        res.json({errors: "you are not able to delete this rating"});
      }
    }
    else
    {
      res.json({errors: "rating not found"});
    }
  })
});

module.exports = router
