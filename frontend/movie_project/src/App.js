import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/LayOut";
import Settings from "./pages/Settings";
import Profiles from "./pages/Profiles";
import Customercenter from "./pages/CustomerCenter";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/search/" element={<SearchResult />} />
      {/* SearchResult결과는 section3 컴포넌트 이용 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/customercenter" element={<Customercenter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
