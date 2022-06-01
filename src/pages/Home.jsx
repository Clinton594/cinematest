import React from "react";
import Navbar from "../components/Navbar";

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
            <div className="row"></div>
          </div>
        </div>
      </div>

      <a href="!#" id="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>

      <footer
        className="
  "
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="textwidget">
                <p>
                  <img
                    loading="lazy"
                    src="https://vivacinemas.com/wp-content/uploads/2019/02/VIVA-Headerlogo.png"
                    alt="VIVA Cinema"
                    width="110px"
                    height="90px"
                  />
                </p>
                <p>&nbsp;</p>
              </div>
              <h6>About VIVA Cinema</h6>
              <div className="menu-footer-2-container">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quo atque sunt quidem ex ratione.
                  Culpa explicabo quibusdam dicta soluta incidunt repellendus minus itaque ut tenetur, at voluptatem
                  pariatur tempora.
                </p>
              </div>
            </div>
            <div className="col-sm-3">
              <h6>Ibadan Cinema</h6>
              <div className="textwidget">
                <p>The Palms Shopping Mall, Ring Road, Ibadan &#8211; Oyo State.</p>
              </div>
              <h6>Ilorin Cinema</h6>
              <div className="textwidget">
                <p>The Palms Shopping Mall, Fate Road Ilorin, Kwara State.</p>
              </div>
            </div>
            <div className="col-sm-3">
              <h6>Ota Cinema</h6>
              <div className="textwidget">
                <p>The Palms Mall, Ota</p>
              </div>
              <h6>Enugu Cinema</h6>
              <div className="textwidget">
                <p>The Palms Polo-Park mall, Enugu</p>
              </div>
              <h6>Ikeja Cinema</h6>
              <div className="textwidget">
                <p>Jara mall, Simbiat Abiola Way, Ikeja.</p>
              </div>
            </div>
            <div className="col-sm-3">
              <h6>Connect with us</h6>

              <div className="textwidget">
                <ul>
                  <li style={{ listStyleType: "none" }}>Social Links</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>
              2019{" "}
              <a href="https://www.kreglex.com" target="_blank" rel="noopener">
                ©
              </a>{" "}
              VIVA Cinemas | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <div id="ssb-container" className="ssb-btns-right ssb-anim-slide">
        <ul className="ssb-dark-hover">
          <li id="ssb-btn-0">
            <p>
              <a href="https://vivacinemas.com/newsletter/">
                <span className="fas fa-envelope"></span> JOIN US
              </a>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
