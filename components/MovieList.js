import React from "react";
import { ListGroup } from "react-bootstrap";

const MovieList = ({ movies, onMovieSelect }) => {
  return (
    <ListGroup>
      {movies.length === 0 ? (
        <p className="text-muted text-center">No hay películas en el historial.</p>
      ) : (
        movies.map((movie) => (
          <ListGroup.Item
            key={movie.id}
            action
            onClick={() => onMovieSelect(movie)}
          >
            {movie.title}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default MovieList;
