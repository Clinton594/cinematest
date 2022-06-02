import $ from "jquery";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logout from "./Icons/Logout";
import route from "../constants/routes";
import { Button } from "../components/Elements";
import { logoutUser } from "../redux/reducers/user";
import { getMetadata } from "../redux/reducers/metadata";

export default function Navbar() {
  const dispatch = useDispatch();
  const { metadata, user } = useSelector((store) => store);
  useEffect(() => {
    $(window).on("scroll", function () {
      const scroll = $(window).scrollTop() || 0;
      if (scroll && scroll >= 50) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });

    if (metadata.locations.length === 0) {
      dispatch(getMetadata());
    }
  }, [metadata, dispatch]);

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
                  <Button onClick={logout} className="nav-link" variant="danger">
                    <span>
                      <Logout /> Logout
                    </span>
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
