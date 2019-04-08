import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('https://lambda-school-zoverlvx.c9users.io:8080/api/movies')
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
  const { title, director, metascore, stars, id } = movie;
  return (
    	<div className="movie-card">
			<Link to={`/movies/${id}`}>
      			<h2>{title}</h2>
			</Link>
      		<div className="movie-director">
        		Director: <em>{director}</em>
      		</div>
      		<div className="movie-metascore">
        		Metascore: <strong>{metascore}</strong>
      		</div>
      		<h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
	    </div>
  );
}
