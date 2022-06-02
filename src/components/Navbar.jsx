import $ from "jquery";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logout from "./Icons/Logout";
import route from "../constants/routes";
import { Button } from "../components/Elements";
import { logoutUser } from "../redux/reducers/user";
import { getMetadata } from "../redux/reducers/metadata";
import Menu from "./Icons/Menu";

export default function Navbar() {
  const dispatch = useDispatch();
  const { metadata, user } = useSelector((store) => store);
  useEffect(() => {
    if (metadata.locations.length === 0) {
      dispatch(getMetadata());
    }
  }, [metadata, dispatch]);

  useEffect(() => {
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop() || 0;
      if (scroll && scroll >= 50) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });

    $(".preloader").fadeOut("slow");
  }, []);

  const toggleNav = () => {
    $("#navbarSupportedContent").toggleClass("show");
  };
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="navbar" role="navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg w-100">
          <Link className="navbar-brand" to={route.home}>
            <img className="mt-2" width="250" src="/img/logo.png" alt="" />
          </Link>
          <button onClick={toggleNav} className="navbar-toggler" type="button">
            <Menu />
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to={route.movies}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                {!user.isLoggedIn && (
                  <Link className="nav-link" to={route.login}>
                    Login
                  </Link>
                )}
                {user.isLoggedIn && window.location.pathname !== route.dashboard && (
                  <Link className="nav-link" to={route.dashboard}>
                    Dashboard
                  </Link>
                )}
                {user.isLoggedIn && window.location.pathname === route.dashboard && (
                  <a href="void:;" onClick={logout} className="nav-link" variant="danger">
                    <span>
                      <Logout /> Logout
                    </span>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
