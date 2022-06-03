import Select from "react-select";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getShows } from "../redux/reducers/shows";
import tabledata from "../constants/tableFormats";
import Section from "../components/Section";
import { Button, Col, Content, Form, Row } from "../components/Elements";
import Spinner from "../components/Spinner";

export default function Home() {
  const [formdata, setformdata] = useState({ filter: "", sort: "" });
  const dispatch = useDispatch();
  const {
    metadata,
    shows: { booked, loading },
  } = useSelector((store) => store);

  const filterData = () => {
    const sortData = {
      location: metadata.locations.map((x) => x.name),
      language: metadata.languages,
      genre: metadata.genre,
    };

    const build = [];
    for (const index in sortData) {
      build.push({
        label: index.toLowerCase(),
        options: sortData[index].map((x) => ({ label: x, value: `${index}~${x}` })),
      });
    }
    return build;
  };

  const updateField = (x, y) => {
    setformdata({ ...formdata, [y.name]: x.length === undefined ? x.value : x.map((t) => t.value).join() });
  };
  const encode = (obj) => {
    return Object.entries(obj)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
  };
  const filterRows = (e) => {
    e.preventDefault();
    dispatch(getShows(encode(formdata)));
    //
  };
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
          <Col md={12}>
            <Form onSubmit={filterRows}>
              <Content className="movies-filter">
                <Row>
                  <Col md={5}>
                    <label htmlFor="filter">
                      <small>Filter Options</small>
                    </label>
                    <Select
                      placeholder="Select Multiple"
                      name="filter"
                      isMulti
                      options={filterData()}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={5}>
                    <label htmlFor="sort">
                      <small>Sort Options</small>
                    </label>
                    <Select
                      name="sort"
                      options={[
                        { label: "Language", value: "language" },
                        { label: "Title", value: "title" },
                      ]}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button disabled={loading} type="submit" variant="danger">
                      Apply {loading && <Spinner variant="info" size="sm" animation="grow" />}
                    </Button>
                  </Col>
                </Row>
              </Content>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <DataTable
              title="Movie Shows"
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
                  href="#!"
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
