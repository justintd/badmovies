//Select one db to work with:

//For SQL
const sqlDb = require("../../db/sql");
//For Mongo
const mongoDb = require("../../db/mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MovieItemSchema = new Schema({
  id: String,
  title: String,
  poster_path: String,
  release_date: String,
  vote_average: Number
});

const movieModel = mongoose.model("movieItem", MovieItemSchema);

module.exports = movieModel;
