import { useState, useEffect } from "react";
import Movies from "../components/Movie";

function Home() {
    const [loading, setLoding] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoding(false);
    };
    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            {loading ? <h1>Loading...</h1> : (<div>
                {movies.map((movies =>
                    <Movies
                        key={movies.id}
                        id={movies.id}
                        medium_cover_image={movies.medium_cover_image}
                        title={movies.title}
                        summary={movies.summary}
                        genres={movies.genres}
                    />
                ))}

            </div>)}
        </div>
    );
}

export default Home;
