import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movie";

function Search() {
    const [loading, setLoding] = useState(true);
    const [movies, setMovies] = useState([])
    const { search } = useParams();
    const searchMovies = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${search}`)
        ).json();
        setMovies(json.data.movies);
        setLoding(false);
        console.log(json);
    };
    useEffect(() => {
        searchMovies();
    }, [search])
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


export default Search;