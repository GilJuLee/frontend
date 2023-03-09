import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Grid from "@mui/material/Grid"; 

const SearchResult = ({ search }) => {
  const [loading, setLoding] = useState(true);
  const [movies, setMovies] = useState([]);
 
 
  const searchMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&query_term=${search}`)
    ).json();
    setMovies(json.data);
    setLoding(false);
  };
  useEffect(() => {
    searchMovies();
  }, [search]);
 
  return (
    <div>
      {loading ? (
        <div style={{ marginTop: "100px" }}>Searching...</div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Grid container spacing={2}>
            {movies.movie_count === 0 ? (
              <div>검색결과가 존재하지 않습니다!</div>
            ) : (
              movies.movies.map((movie) => (
                <Grid item xs={2} key={movie.id}>
                  <Movie
                    id={movie.id}
                    medium_cover_image={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
