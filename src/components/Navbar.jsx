import React from "react";

export default function Navbar() {
  return (
    <header className="navbar" role="navigation">
      <div className="container">
        <nav class="navbar navbar-expand-lg w-100">
          <a class="navbar-brand" href="!#">
            <img className="mt-2" width="250" src="/img/logo.png" alt="" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="!#">
                  Movies
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="!#">
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
