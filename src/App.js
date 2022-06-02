import { BrowserRouter, Route, Routes } from "react-router-dom";

import route from "./constants/routes";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import Protected from "./components/auth/Protected";

function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path={route.home} exact element={<Home />} />
          <Route path={route.login} exact element={<Login />} />
          <Route path={route.movies} exact element={<Movies />} />
          {/* The only protected route */}
          <Route path={route.dashboard} exact element={<Protected />}>
            <Route path={route.dashboard} exact element={<Admin />} />
          </Route>
          <Route path={route.notfound} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
