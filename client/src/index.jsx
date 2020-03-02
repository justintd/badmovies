import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";

const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
      selectGenre: "28"
    };

    // you might have to do something important here!
    this.handleChange = this.handleChange.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    let url = "http://localhost:3000/movies/search";
    axios
      .get(url, {
        params: {
          genre: this.state.selectGenre
        }
      })
      .then(res =>
        this.setState({
          movies: res.data
        })
      )
      .catch(err => console.log(err));
  }

  saveMovie(movie) {
    // same as above but do something diff
    let url = "http://localhost:3000/movies/save";
    let payload = {
      id: movie.id,
      title: movie.original_title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    };

    axios
      .post(url, payload)
      .then(res => {
        this.getFavorites();
        console.log("Added movie to favorites.");
      })
      .catch(err => console.log(err));
  }

  deleteMovie(movie) {
    let url = "http://localhost:3000/movies/delete";

    let payload = {
      id: movie.id
    };

    axios
      .delete(url, { data: payload })
      .then(res => {
        this.getFavorites();
        console.log("Deleted movie from favorites.");
      })
      .catch(err => console.log(err));
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  getFavorites() {
    let url = "http://localhost:3000/movies/favorites";

    axios
      .get(url)
      .then(result => {
        this.setState({
          favorites: result.data
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
            handleChange={this.handleChange}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
