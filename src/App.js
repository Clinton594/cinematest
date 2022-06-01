import { BrowserRouter, Route, Routes } from "react-router-dom";

import route from "./constants/routes";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
