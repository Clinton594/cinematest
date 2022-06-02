import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Add from "../Icons/Add";
import Spinner from "../Spinner";
import NewMovie from "./NewMovie";
import { getMovies } from "../../redux/reducers/shows";
import { Col, Row, Content, Button } from "../Elements";

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

  const tabledata = {
    columns: [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Cast",
        selector: (row) => row.cast,
      },
      {
        name: "Language",
        selector: (row) => row.language,
      },
      {
        name: "Genre",
        selector: (row) => row.genre,
      },
      {
        name: "Date Created",
        selector: (row) => row.date,
      },
    ],
  };
  return (
    <Content id="id">
      <h5>Showing a list of uploaded Movies</h5>
      <hr />
      <Row>
        <Col md={3} sm={6}></Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataTable columns={tabledata.columns} data={movies} selectableRows pagination />
        </Col>
      </Row>
      <Row>
        <Col className="mt-4 d-flex justify-content-end" md="12">
          <Button
            disabled={loading}
            variant="warning"
            onClick={() => {
              toggleShowModal(true);
            }}
          >
            {!loading && <Add />}
            <span> New Movie</span> {loading && <Spinner animation="grow" size="sm" variant="default" />}
          </Button>
        </Col>
      </Row>
      {showModal && <NewMovie toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
