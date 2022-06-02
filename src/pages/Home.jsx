import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/Elements";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

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

      <Footer />
    </>
  );
}
