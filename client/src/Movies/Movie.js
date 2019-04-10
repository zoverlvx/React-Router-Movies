import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    this.fetchMovie(this.props.match.params.id);
  }
	
	
  // This is deprecated. Need to find the correct answer	
  componentWillReceiveProps(newProps) {
	if(this.props.match.params.id !== newProps.match.params.id) {
		this.fetchMovie(newProps.match.params.id);
	}
  }

  fetchMovie = id => {
    axios
      .get(`https://lambda-school-zoverlvx.c9users.io:8080/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
	console.log(this.props)
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="save-wrapper">
			<MovieCard movie={this.state.movie} />
        	<div 
				onClick={this.saveMovie} 
				className="save-button"
			>
				Save
			</div>
      </div>
    );
  }
}
