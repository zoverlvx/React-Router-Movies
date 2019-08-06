import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import MovieCard from "./MovieCard";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("https://for-students-gcbyb.run.goorm.io:5000/api/movies")
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  const { id } = movie;
  return (
			<Link 
				style={{
					color: "inherit",
					textDecoration: "none"}} 
				to={`/movies/${id}`}
			>
				<MovieCard movie={movie} />
			</Link>
  );
}
