const route = {
  home: "/",
  dashboard: "/dashboard",
  movies: "/movies",
  login: "/login",
  notfound: "*",
  api: process.env.NODE_ENV === "development" ? "http://localhost/naija-cinema/api/" : "https://cinematest.live/api/",
};

export default route;
