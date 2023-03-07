
import PropTypes from "prop-types";
import axios from "axios";
import React from 'react';
import Movies from "./components/Movie";

class App extends React.Component {
    state = {
        isLoading: true,
        moives: [],
        input: "good"
    }


    getMovies = async () => {
        const { data: { data: { movies } } } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
        this.setState({ movies, isLoading: false })
    }
    getSearchedMovies = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true })
        const { data: { data: { movies } } } = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term="${this.state.input}"`);
        this.setState({ movies, isLoading: false })
    }
    goInput = (e) => {
        this.setState({ input: e.target.value })
    }
    componentDidMount() {
        console.log("component DId Monnt");
        this.getMovies();
    }

    render() {
        console.log("rendering");
        const { isLoading, movies } = this.state;
        return (
            <section className="container">{this.state.isLoading ?
                <div className="loader">
                    <span className="loader_text">Loading...</span>
                </div>
                : (
                    <div class="innerContainer">
                        <div className="search">
                            <form onSubmit={this.getSearchedMovies}>
                                <input className="input" type="text" onChange={this.goInput} />
                                <input type="submit" value="submit" />
                            </form>
                        </div>
                        <div className="movies">
                            {movies.map(movie => (
                                <Movies
                                    key={movie.id}
                                    id={movie.id}

                                    title={movie.title}
                                    summary={movie.summary}
                                    medium_cover_image={movie.medium_cover_image}
                                    genres={movie.genres}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        )
    }
}
export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./routes/Home";
// import Detail from "./routes/Detail";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movie/:movid" element={<Detail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
