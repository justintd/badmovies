const request = require("request");
const axios = require("axios");
const { API_KEY } = require("../../config.js");

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

const queryGenres = () => {
  let url = "http://api.themoviedb.org/3/genre/movie/list";
  return axios.get(url, {
    params: {
      api_key: API_KEY
    }
  });
};

const queryWorstMovies = genre => {
  let url = "https://api.themoviedb.org/3/discover/movie";
  return axios.get(url, {
    params: {
      api_key: API_KEY,
      sort_by: "vote_average.asc",
      page: 1,
      with_genres: genre,
      "vote_count.gte": "10"
    }
  });
};

module.exports = {
  queryGenres: queryGenres,
  queryWorstMovies: queryWorstMovies
};
