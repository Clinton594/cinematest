const route = {
  home: "/",
  dashboard: "/dashboard",
  movies: "/movies",
  movie: "/movie",
  login: "/login",
  notfound: "*",
  api: process.env.NODE_ENV === "development" ? "http://localhost/cinematest/api/" : "https://cinematest.website/api/",
};

export default route;
