import React, { useEffect, useState } from "react";
import { Button } from 'antd';

const Movie_info = (props) => {
  const [movie, setMovie] = useState([]);
  const { selectedMovie } = props;

  const getMovieInfo = async (selectedMovie) => {
		const url = `https://www.omdbapi.com/?i=${selectedMovie}&apikey=2ca2d775`;
		const response = await fetch(url);
		const responseJson = await response.json();
		setMovie(responseJson);
	};

	useEffect(() => {
		getMovieInfo(selectedMovie);
	}, [selectedMovie]);

  const boxOffice = (movie) => {
    if(movie.imdbRating >= 7){ return (
        <Button type="primary" danger> HIT </Button>
      );
    }
    return ( <Button type="primary" danger> FLOP </Button>);
  }

  return (
    <div className="movie_details">
      {
        <>
          <img src={movie?.Poster} alt={movie?.Title} />
          <div className="movie_column">
            <h1> {movie?.Type}: <span>{movie?.Title}</span></h1>
            <h2>IMDB Rating: {movie?.imdbRating}</h2>
            <h2>Box Office: {boxOffice(movie)}</h2>
            <h2>Released: {movie?.Released}</h2>
            <h2>IMDB Rating: {movie?.imdbRating}</h2>
            <h2>Language: {movie?.Language}</h2>
            <h2>Runtime: {movie?.Runtime}</h2>
            <h2>Genre: {movie?.Genre}</h2>
            <h2>Director: {movie?.Director}</h2>
            <h2>Actors: {movie?.Actors}</h2>
            <h3>Description: {movie?.Plot}</h3>
          </div>
          <Button type="primary" danger onClick={() => props.onMovieSelect()}> Close</Button>
        </>
      }
    </div>
  );
};
export default Movie_info;