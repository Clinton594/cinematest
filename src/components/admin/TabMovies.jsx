import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Add from "../Icons/Add";
import Spinner from "../Spinner";
import NewMovie from "./NewMovie";
import { getMovies } from "../../redux/reducers/shows";
import { Col, Row, Content, Button } from "../Elements";
import tabledata from "../../constants/tableFormats";

export default function TabMovies() {
  const dispatch = useDispatch();
  const { movies, loading, toast } = useSelector((store) => store.shows);
  const [showModal, toggleShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    toast === true && !loading && toggleShowModal(false);
  }, [toast, loading]);

  return (
    <Content id="id">
      <h5 className="d-flex justify-content-between align-items-center">
        <span>Showing a list of uploaded Movies</span>
        <button
          disabled={loading}
          className="btn-warning btn"
          onClick={() => {
            toggleShowModal(true);
          }}
        >
          {!loading && <Add />}
          <span> New Movie</span> {loading && <Spinner animation="grow" size="sm" variant="default" />}
        </button>
      </h5>
      <hr />
      <Row>
        <Col md={3} sm={6}></Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataTable columns={tabledata.movies} data={movies} selectableRows pagination />
        </Col>
      </Row>
      {showModal && <NewMovie toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
