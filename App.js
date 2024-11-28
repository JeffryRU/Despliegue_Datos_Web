import React, { useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import RecommendationList from "./components/RecommendationList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [movies, setMovies] = useState([]); // Lista de películas (historial)
  const [selectedMovie, setSelectedMovie] = useState(null); // Película seleccionada
  const [recommendations, setRecommendations] = useState([]); // Recomendaciones de la película seleccionada
  const [search, setSearch] = useState(""); // Texto del buscador

  // Función para buscar una película y obtener recomendaciones
  const searchMovie = async () => {
    if (!search) return; // Si el buscador está vacío, no hacemos nada

    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: search, num_recommendations: 5 }),
      });
      const data = await response.json();

      // Agregar la película buscada al historial si no existe ya
      if (!movies.find((movie) => movie.title === search)) {
        setMovies((prevMovies) => [
          ...prevMovies,
          { title: search, id: movies.length + 1 }, // Puedes usar el ID real de la película si está disponible
        ]);
      }

      setRecommendations(data.recommendations); // Guardar las recomendaciones para la película buscada
      setSearch(""); // Limpiar el buscador
    } catch (error) {
      console.error("Error buscando película:", error);
    }
  };

  // Manejar la selección de una película del historial
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie); // Seleccionar la película
    searchMovie(movie.title); // Buscar recomendaciones para la película seleccionada
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Recomendador de Películas</h1>

      {/* Buscador */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar película..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={searchMovie}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de películas e información */}
      <div className="row mt-4">
        <div className="col-md-6">
          <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
        </div>
        <div className="col-md-6">
          {selectedMovie && (
            <MovieDetails movie={selectedMovie} recommendations={recommendations} />
          )}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="mt-4">
        <RecommendationList
          recommendations={recommendations}
          onMovieSelect={handleMovieSelect}
        />
      </div>
    </div>
  );
};

export default App;
