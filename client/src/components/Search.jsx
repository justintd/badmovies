import React from "react";

const axios = require("axios");

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: []
    };
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    let url = "http://localhost:3000/movies/genres";

    axios
      .get(url)
      .then(result => {
        let genreList = [];
        result.data.map(genre => genreList.push(genre));
        this.setState({
          genres: genreList
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
        <select
          name="selectGenre"
          value={this.state.selectGenre}
          onChange={event => this.props.handleChange(event)}
        >
          {this.state.genres.map(genre => (
            <option key={genre.id} name={genre.name} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button onClick={() => this.props.getMovies()}>Search</button>
      </div>
    );
  }
}

export default Search;
