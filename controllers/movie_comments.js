var express = require('express'),
    router = express.Router(),
    MovieComments = require('../models/movie_comments');

// List comments by movie
router.get('/:imdb_id', function(req, res) {
  //TODO: use middleware
  user_id = req.query.user_id;

  Promise.all([
    MovieComments.find({imdb_id: req.params.imdb_id, user_id: user_id }).sort('-date'),
    MovieComments.find({imdb_id: req.params.imdb_id, user_id: {'$ne': user_id }}).sort('-date')
  ])
  .then(results => {
    const [my_comments, all_comments] = results;
    console.log("my_comments",my_comments);
    console.log("all_comments",all_comments);
    res.json({comments: my_comments.concat(all_comments)})
  })
  .catch(err=>{
    console.error("Something went wrong",err);
    res.json({message: "Something went wrong", error: err});
  })
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
         .then(new_comment => {
             res.json({comment: new_comment});
           })
         .catch(err => {
           console.error("Something went wrong",err);
           res.json({message: "Something went wrong", error: err.message});
         });
});

// Update a rating & comment
router.put('/:id', function(req, res) {
  let user_id = req.query.user_id; // TODO: middleware

  MovieComments.findOne({id: req.params.id, user_id: user_id}, (err, result) => {
    if(result) {
        MovieComments.updateOne({id: req.params.id}, {
          comment: req.body.comment,
          stars: req.body.stars
        }).then((err, comment) => {
          res.json({result: 'ok'});
        })
        .catch(err => {
          console.error("Something went wrong",err);
          res.json({message: "Something went wrong", error: err.message});
        });
    }
    else
    {
      res.json({errors: "rating not found"});
    }
  })
});

// Delete a rating & comment
router.delete('/:id', function(req, res) {
  let user_id = req.query.user_id; // TODO: middleware

  console.log(req.params.id)
  MovieComments.findOne({id: req.params.id, user_id: user_id}, (err, result) => {
    console.log(result)
    if(result) {
      MovieComments.deleteOne({id: req.params.id})
        .then((err, comment) => {
          res.json({result: 'ok'});
        })
        .catch(err => {
          console.error("Something went wrong", err);
          res.json({message: "Something went wrong", error: err});
        });
    }
    else
    {
      res.json({errors: "rating not found"});
    }
  })
});

module.exports = router
