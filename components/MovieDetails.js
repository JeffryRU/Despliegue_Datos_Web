import React from "react";
import { Card } from "react-bootstrap";

const MovieDetails = ({ movie }) => {
  const {
    title,
    overview,
    vote_average,
    vote_count,
    release_date,
    poster_path,
  } = movie;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
        alt={`${title} Poster`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{overview || "No hay descripción disponible."}</Card.Text>
        <p><strong>Calificación:</strong> {vote_average || "N/A"}</p>
        <p><strong>Votos:</strong> {vote_count || "N/A"}</p>
        <p><strong>Fecha de lanzamiento:</strong> {release_date || "N/A"}</p>
      </Card.Body>
    </Card>
  );
};

export default MovieDetails;
