import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const { locations } = useSelector((store) => store.metadata);
  return (
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
  );
}
