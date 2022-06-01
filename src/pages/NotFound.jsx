import React from "react";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <main className="login" style={{ backgroundImage: "url(/img/p4.png)", minHeight: "100vh" }}>
      <Navbar />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <img src="img/plug-pana.png" alt="" className="w-100" />
        </div>
      </div>
    </main>
  );
}
