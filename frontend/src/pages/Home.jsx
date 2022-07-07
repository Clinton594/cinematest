import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Location from "../components/Location";
import route from "../constants/routes";

export default function Home() {
  const { locations } = useSelector((store) => store.metadata);
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
            <div className="row section locations">
              {locations.length > 0 &&
                locations.map((location) => (
                  <div key={location.name} className="col d-flex justify-content-center">
                    <Link to={`${route.movie}/?filter=location~${location.name.toLowerCase()}`}>
                      <Location event={location} />
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

      <Footer />
    </>
  );
}
