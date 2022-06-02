import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../Spinner";
import { createBooking } from "../../redux/reducers/shows";
import { Form, FormElement, Row, Col } from "../Elements";
import { setToast } from "../../redux/reducers/toast";

export default function NewBooking({ toggleShowModal, showModal }) {
  const dispatch = useDispatch();
  const { metadata, shows } = useSelector((store) => store);
  const [swipe, toggleSwipe] = useState("");
  const [event, updateEvent] = useState({
    location: "",
    theatre_name: "",
    show_time: "",
    show_date: "",
    movie_id: "",
  });
  const [theatres, updateTheatres] = useState([]);
  const loading = shows.loading;

  useEffect(() => {
    setTimeout(() => {
      toggleSwipe((showModal && "show") || "");
    }, 100);
  }, [showModal]);

  useEffect(() => {
    if (event.location) {
      updateTheatres(metadata.locations.filter((x) => x.name === event.location).shift().theatre);
    } else updateTheatres([]);
  }, [event.location]);

  const updateField = (e, f) => {
    !f && updateEvent({ ...event, [e.target.name]: e.target.value });
    if (f && f.action) {
      let value;
      if (f.option) value = e.map((x) => x.value).join();
      else value = e.value;
      updateEvent({ ...event, [f.name]: value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (Object.values(event).every((x) => x)) {
      dispatch(createBooking(event));
    } else dispatch(setToast({ status: false, show: true, title: "Movies", message: "Fill up empty fields" }));
  };
  return (
    <>
      <div
        onClick={() => {
          toggleShowModal(!showModal);
        }}
        className="fade modal-backdrop show"
      ></div>
      <div className={`modal fade ${swipe}`}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <Form>
                <Row>
                  <Col md={12}>
                    <label>
                      <small>Choose Location</small>
                    </label>
                    <Select
                      name="location"
                      defaultValue={event.location}
                      options={metadata.locations.map((x) => ({ label: x.name, value: x.name }))}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={6}>
                    <label>
                      <small>Select Theatre</small>
                    </label>
                    <Select
                      name="theatre_name"
                      defaultValue={event.theatre_name}
                      options={theatres.map((x) => ({ label: x, value: x }))}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={6}>
                    <label>
                      <small>Select Movie</small>
                    </label>
                    <Select
                      name="movie_id"
                      defaultValue={event.movie_id}
                      options={shows.movies.map((x) => ({ label: x.title, value: x.id }))}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={6}>
                    <FormElement
                      disabled={loading}
                      onChange={updateField}
                      value={event.show_date}
                      label="Movie Date"
                      name="show_date"
                      type="date"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <FormElement
                      disabled={loading}
                      onChange={updateField}
                      value={event.show_time}
                      label="Movie Time"
                      name="show_time"
                      type="time"
                      required
                    />
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="modal-footer">
              <button onClick={submitForm} type="button" className="btn btn-danger d-flex align-items-center">
                Save changes {loading && <Spinner variant="warning" className="ml-2" size="sm" animation="border" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//
