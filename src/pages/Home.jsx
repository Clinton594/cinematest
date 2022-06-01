import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import locations from "../constants/locations";
import { Button } from "../components/Elements";

export default function Home() {
  return (
    <>
      <div className="rocket-lazyload" id="content_hero">
        <Navbar />
        <div className="container">
          <div className="row blurb">
            <div className="col-md-9">
              <span className="title"></span>
              <header>
                <h1 className="light-text">Buy Movie Tickets</h1>
              </header>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="row">
          <div className="col-sm-12">
            <header>
              <h2 className="text-center light-text text-danger">Choose where to watch from</h2>
              <hr />
            </header>
            <div className="row section">
              {locations.length > 0 &&
                locations.map((location) => (
                  <div key={location.name} className="col d-flex justify-content-center">
                    <Link to={`/movies/${location.name.toLowerCase()}`}>
                      <Button variant="danger" className="px-4 my-2">
                        {location.name}
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 justify-content-center">
            <img width="100%" src="/img/batman-tickets.png" alt="" />
          </div>
        </div>
      </div>

      <footer className="mt-5">
        <div className="container">
          <div className="row">
            {locations.length > 0 &&
              locations.map((location) => (
                <div key={location.name} className="col-md-4">
                  <h4>{location.name}</h4>
                  <p className="light-text">{location.address}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="copyright mt-3 text-center">
          <hr />
          <p>
            <a href="!#" target="_blank" rel="noopener">
              ©
            </a>
            2022 | CinemaTest | All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
