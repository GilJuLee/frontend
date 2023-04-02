import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/LayOut";
import Profiles from "./pages/Profiles";
import Customercenter from "./pages/CustomerCenter";
import ProfileUpdate from "./pages/ProfileUpdate";
import BoardInsert from "./pages/BoardInsert";
import { useEffect } from "react";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import BoardModify from "./pages/BoardModify";
import BoardDetail from "./components/BoardDetail";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  if (
    location.pathname === "/login" ||
    location.pathname === "/profiles" ||
    location.pathname === "/" ||
    location.pathname === "/search/" ||
    location.pathname === "/profileupdate"
  ) {
    document.body.style.backgroundColor = "rgb(42, 43, 43)";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/search/" element={<SearchResult />} />
      {/* SearchResult결과는 section3 컴포넌트 이용 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/customercenter" element={<Customercenter />} />
      <Route path="/customercenter/board" element={<Board />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/board/:board_num" element={<BoardDetail />} />
      <Route path="/profileupdate" element={<ProfileUpdate />} />
      <Route path="/boardInsert" element={<BoardInsert />} />
      <Route path="/boardModify/:board_num" element={<BoardModify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
