import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}`)
      .then((response) => {
        setMovies(response.data.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              className="movie-item"
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                className="movie-image"
                src={movie.medium_cover_image}
                alt={movie.title}
              />
              <div className="movie-overlay">
                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          ))}
        </div>
        {selectedMovie && (
          <div className="modal">
            <div className="modal-content">
              <img
                className="modal-image"
                src={selectedMovie.large_cover_image}
                alt={selectedMovie.title}
              />
              <div className="modal-details">
                <h2 className="modal-title">{selectedMovie.title}</h2>
                <p className="modal-summary">{selectedMovie.summary}</p>
                <button className="close-button" onClick={handleCloseClick}>
                  Close 
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
