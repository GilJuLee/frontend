import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import SearchResult from "../pages/SearchResult";

const Layout = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* search input에서 글자 입력하면  main 안 section1, section2, section3도 보여주면서 검색결과 바뀌어서 보여줌(section3), 엔터치면 section3으로 전체 화면 대체 */}
      <div>
        <header>
          <NavBar search={search} setSearch={setSearch} />
        </header>
        <main>
          {search === "" ? (
            <div>
              <Outlet />
              <footer>
                <Footer />
              </footer>
            </div>
          ) : (
            <SearchResult />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
