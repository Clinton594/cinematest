import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Col, Row, Content, Aside, Ul, Li, Container, Button } from "../Elements";
import Add from "../Icons/Add";
import NewMovie from "./NewMovie";

export default function TabZero() {
  const [showModal, toggleShowModal] = useState(false);
  const tabledata = {
    columns: [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Year",
        selector: (row) => row.year,
      },
    ],
    data: [
      {
        id: 1,
        title: "Beetlejuice",
        year: "1988",
      },
      {
        id: 2,
        title: "Ghostbusters",
        year: "1984",
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
          <DataTable columns={tabledata.columns} data={tabledata.data} selectableRows pagination />
        </Col>
      </Row>
      <Row>
        <Col className="mt-4 d-flex justify-content-end" md="12">
          <Button
            variant="warning"
            onClick={() => {
              toggleShowModal(true);
            }}
          >
            <Add /> <span> New Movie</span>
          </Button>
        </Col>
      </Row>
      {showModal && <NewMovie toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
