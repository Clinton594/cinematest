import { BrowserRouter, Route, Routes } from "react-router-dom";

import route from "./constants/routes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.home} element={<Home />} />
      </Routes>
      <Routes>
        <Route path={route.login} element={<Login />} />
      </Routes>
      <Routes>
        <Route path={route.movies} element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
