import React from "react";

export default function Navbar() {
  return (
    <header className="navbar" role="navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg w-100">
          <a className="navbar-brand" href="!#">
            <img className="mt-2" width="250" src="/img/logo.png" alt="" />
          </a>
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
                <a className="nav-link" href="!#">
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
