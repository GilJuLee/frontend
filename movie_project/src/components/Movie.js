import { Link } from "react-router-dom";

function Movie({ id, medium_cover_image, title, summary, genres }) {

    return <div>
        <Link to={`/movie/${id}`}>
            <img src={medium_cover_image} alt={title}></img>
        </Link>
        <h2>
            <Link to={`/movie/${id}`}>{title}</Link></h2>
        <p>{summary}</p>
    </div >;
}
export default Movie;