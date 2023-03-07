import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movie";


function Detail() {
    const [loading, setLoding] = useState(true);
    const [movies, setMovies] = useState([])
    const { movid } = useParams();
    const getMovies = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movid}`)
        ).json();
        setMovies(json.data.movie);
        setLoding(false);
        console.log(json);
    };
    useEffect(() => {
        getMovies();
    }, [])
    return (
        <div>
            {loading ? <h1>Loading...</h1> : (<div>
                <Movies
                    key={movies.id}
                    id={movies.id}
                    medium_cover_image={movies.medium_cover_image}
                    title={movies.title}
                    summary={movies.description_intro}
                    genres={movies.genres}
                /></div>
            )
            }

        </div>
    );
}


export default Detail;