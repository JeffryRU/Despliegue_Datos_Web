import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const RecommendationList = ({ recommendations, onMovieSelect }) => {
  return (
    <div>
      <h3>Películas Recomendadas</h3>
      <Row>
        {recommendations.length === 0 ? (
          <p className="text-muted text-center">No hay recomendaciones disponibles.</p>
        ) : (
          recommendations.map((movie, index) => (
            <Col md={3} key={index}>
              <Card
                onClick={() => onMovieSelect(movie)}
                className="mb-4"
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default RecommendationList;
