import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Add from "../Icons/Add";
import Spinner from "../Spinner";
import NewMovie from "./NewMovie";
import { editSlice, getMovies } from "../../redux/reducers/shows";
import { Col, Row, Content } from "../Elements";
import tabledata from "../../constants/tableFormats";
import Movie from "../Icons/Video";

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

  const editRow = (row) => {
    toggleShowModal(true);
    const copy = { ...row, section: "Movie" };
    dispatch(editSlice(copy));
  };
  return (
    <Content id="id">
      <h5 className="d-flex justify-content-between align-items-center">
        <span>
          <Movie /> Showing a list of uploaded Movies
        </span>
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
          <DataTable
            onRowClicked={editRow}
            persistTableHead={true}
            columns={tabledata.movies}
            data={movies}
            selectableRows
            pagination
          />
        </Col>
      </Row>
      {showModal && <NewMovie toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
