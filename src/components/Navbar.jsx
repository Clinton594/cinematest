import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import route from "../constants/routes";

export default function Navbar() {
  useEffect(() => {
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop() || 0;
      if (scroll && scroll >= 50) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });
  }, []);
  return (
    <header className="navbar" role="navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg w-100">
          <Link className="navbar-brand" to={route.home}>
            <img className="mt-2" width="250" src="/img/logo.png" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to={route.movies}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={route.login}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
