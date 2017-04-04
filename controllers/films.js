//since we don't have a database we'll use our front end models at the moment
var films = require('../client/src/models/films');
var Film = require('../client/src/models/film');
var Review = require('../client/src/models/review');
var movies = new films();
var express = require('express');
var filmRouter = new express.Router();

filmRouter.get('/', function(req, res){
  res.json(movies);
});

filmRouter.get('/:id', function(req, res){
  res.json({movies: movies[req.params.id]});
});

filmRouter.put('/:id', function(req, res){
  movies[req.params.id] = req.body.movie;
  res.json({data:movies});
});

filmRouter.delete('/:id', function(req, res){
  movies.splice(req.body.id, 1);
  res.json({data:movies});
});

filmRouter.post('/', function(req, res){
  movies.push(new Film({title: req.body.title, actors: req.body.actors.split(',')}));
  res.json({data:movies});
});

filmRouter.post('/:id/review', function(req, res){
  movies[req.params.id]["reviews"].push(new Review({comment: req.body.comment, rating: parseInt(req.body.rating), author: req.body.author}));
  res.json({data:movies});
});

module.exports = filmRouter;