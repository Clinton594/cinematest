import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getShows } from "../redux/reducers/shows";
import tabledata from "../constants/tableFormats";
import Section from "../components/Section";
import { Col, Content, Row } from "../components/Elements";

export default function Home() {
  const dispatch = useDispatch();
  const {
    shows: { booked },
  } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getShows());
    setTimeout(() => {
      dispatch(getShows());
    }, 100000);
  }, [dispatch]);

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
      <Section className="container">
        <Row>
          <Col>Header</Col>
        </Row>
        <Row>
          <Col md="12">
            <DataTable
              columns={tabledata.booked}
              data={booked}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </Col>
        </Row>
      </Section>
      <Footer />
    </>
  );
}

const ExpandedComponent = ({ data }) => {
  const locations = Object.keys(data.booked);
  const [booking, updateBooking] = useState([]);
  const [active, setActive] = useState("");
  const switchTo = (location) => {
    const list = data.booked[location];
    updateBooking(list);
    setActive(location);
  };
  return (
    <>
      <Section className="extended-component">
        <Content className="container">
          <nav className="nav nav-pills nav-justified">
            {locations.length > 0 &&
              locations.map((location) => (
                <a
                  key={location}
                  onClick={() => switchTo(location)}
                  className={`nav-item nav-link ${location === active ? "active" : ""}`}
                  href="javascript:;"
                >
                  {location.toUpperCase()}
                </a>
              ))}
          </nav>
          {booking.length > 0 && (
            <Row>
              <Col className="col-md-12">
                <hr />
              </Col>
              <Col md={12}>
                <DataTable columns={tabledata.location} data={booking} />
              </Col>
            </Row>
          )}
        </Content>
      </Section>
    </>
  );
};
