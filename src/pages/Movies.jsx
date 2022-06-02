import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
      <Footer />
    </>
  );
}
