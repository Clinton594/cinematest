import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import locations from "../constants/locations";
import { Button } from "../components/Elements";

export default function Home() {
  return (
    <>
      <div className="rocket-lazyload bg-cinema">
        <Navbar />
        <div className="container">
          <div className="row ">
            <div className="col-md-9">
              <div className="banner-title">
                <h1 className="light-text">Movies List</h1>
              </div>
            </div>
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
