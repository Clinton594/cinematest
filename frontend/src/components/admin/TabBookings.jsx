import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import Add from "../Icons/Add";
import Spinner from "../Spinner";
import NewBooking from "./NewBooking";
import Booking from "../Icons/Booking";
import { Col, Row, Content } from "../Elements";
import tabledata from "../../constants/tableFormats";
import { setToast } from "../../redux/reducers/toast";
import { editSlice, getBookings, resetToast } from "../../redux/reducers/shows";

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
      dispatch(resetToast());
    }
  }, [toast, loading, dispatch]);

  const handleChange = (data) => {};
  const editRow = (row) => {
    toggleShowModal(true);
    const copy = { ...row, section: "Booking" };
    dispatch(editSlice(copy));
  };
  return (
    <Content id="id">
      <h5 className="d-flex justify-content-between w-100 align-item-center">
        <span>
          <Booking /> Booked Movie Shows
        </span>
        <button
          disabled={loading}
          className="btn-success btn"
          onClick={() => {
            toggleShowModal(true);
          }}
        >
          {!loading && <Add />}
          <span className="text-white"> Create Booking</span>{" "}
          {loading && <Spinner animation="grow" size="sm" variant="default" />}
        </button>
      </h5>
      <hr />
      <Row>
        <Col md={3} sm={6}></Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataTable
            onSelectedRowsChange={handleChange}
            onRowClicked={editRow}
            columns={tabledata.bookings}
            data={bookings}
            selectableRows
            pagination
          />
        </Col>
      </Row>
      {showModal && <NewBooking toggleShowModal={toggleShowModal} showModal={showModal} />}
    </Content>
  );
}
