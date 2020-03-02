const movieModel = require("../models/movieModel.js");
const apiHelpers = require("../helpers/apiHelpers.js");
const axios = require("axios");
const mongo = require("../../db/mongodb/index.js");

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
    apiHelpers
      .queryWorstMovies(req.query.genre)
      .then(({ data }) => res.send(data.results));
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
    apiHelpers.queryGenres().then(({ data }) => {
      res.send(data.genres);
    });
  },
  saveMovie: (req, res) => {
    let data = {
      id: req.body.id,
      title: req.body.title,
      poster_path: req.body.poster_path,
      release_date: req.body.release_date,
      vote_average: req.body.vote_average
    };

    mongo.db
      .collection("favoriteMovies")
      .insertOne(movieModel(data))
      .then(result => {
        res.send(
          console.log(
            `Successfully inserted item with _id: ${result.insertedId}`
          )
        );
      })
      .catch(err => console.log(err));
  },
  deleteMovie: (req, res) => {
    mongo.db
      .collection("favoriteMovies")
      .deleteOne({ id: req.body.id })
      .then(result => res.send(result.data))
      .catch(err => res.send(err));
  },
  getFavorites: (req, res) => {
    mongo.db
      .collection("favoriteMovies")
      .find()
      .toArray()
      .then(data => res.send(data));
  }
};
