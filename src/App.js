import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Search from "./routes/Search";
import { useState } from "react"
function App() {
  const [search, setSearch] = useState('');
  const onChange = (event) => setSearch(event.target.value);

  return (
    <Router>
      <div>
        <h1>검색 제발 되라</h1>
        <input
          onChange={onChange}
          value={search}
          type="text" />
        <Link to={`/search/${search}`}>
          <button>검색</button>
        </Link>
        <Routes>
          <Route path="/search/:search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movid" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

