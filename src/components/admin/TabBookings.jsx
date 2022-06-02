import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Add from "../Icons/Add";
import Spinner from "../Spinner";
import NewBooking from "./NewBooking";
import { getBookings } from "../../redux/reducers/shows";
import { Col, Row, Content, Button } from "../Elements";
import { setToast } from "../../redux/reducers/toast";

export default function TabBookings() {
  const dispatch = useDispatch();
  const { bookings, loading, toast } = useSelector((store) => store.shows);
  const [showModal, toggleShowModal] = useState(false);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  useEffect(() => {
    if (toast === true && !loading) {
      toggleShowModal(false);
      dispatch(setToast({ show: true, status: true, message: "Successful", title: "New Booking" }));
    }
  }, [toast, loading]);

  const handleChange = (data) => {};
  const tabledata = {
    columns: [
      {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
      },
      {
        name: "Theatre",
        selector: (row) => row.theatre_name,
      },
      {
        name: "Movie Title",
        selector: (row) => row.title,
      },
      {
        name: "Showing by",
        selector: (row) => row.formatted_show_time,
      },
      {
        name: "Date Created",
        selector: (row) => row.date,
      },
    ],
  };
  return (
    <Content id="id">
      <h5>Booked Movies</h5>
      <hr />
      <Row>
        <Col md={3} sm={6}></Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataTable
            onSelectedRowsChange={handleChange}
            columns={tabledata.columns}
            data={bookings}
            selectableRows
            pagination
          />
        </Col>
      </Row>
      <Row>
        <Col className="mt-4 d-flex justify-content-end" md="12">
          <Button
            disabled={loading}
            variant="danger"
            onClick={() => {
              toggleShowModal(true);
            }}
          >
            {!loading && <Add />}
            <span className="text-white"> Create Booking</span>{" "}
            {loading && <Spinner animation="grow" size="sm" variant="default" />}
          </Button>
        </Col>
      </Row>
      {showModal && <NewBooking toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
