import { BrowserRouter, Route, Routes } from "react-router-dom";

import route from "./constants/routes";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.home} exact element={<Home />} />
        <Route path={route.login} exact element={<Login />} />
        <Route path={route.movies} exact element={<Movies />} />
        <Route path={route.dashboard} exact element={<Admin />} />
        <Route path={route.notfound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
