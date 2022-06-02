import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../Spinner";
import { createMovie } from "../../redux/reducers/shows";
import { Form, FormElement, Row, Col } from "../Elements";
import { setToast } from "../../redux/reducers/toast";

export default function NewMovie({ toggleShowModal, showModal }) {
  const dispatch = useDispatch();
  const { metadata, shows } = useSelector((store) => store);
  const [swipe, toggleSwipe] = useState("");
  const [movie, updateMovie] = useState({ title: "", cast: "", genre: "", language: "" });
  const loading = shows.loading;

  useEffect(() => {
    setTimeout(() => {
      toggleSwipe((showModal && "show") || "");
    }, 100);
  }, [showModal]);

  const updateField = (e, f) => {
    !f && updateMovie({ ...movie, [e.target.name]: e.target.value });
    if (f && f.action) {
      let value;
      if (f.option) value = e.map((x) => x.value).join();
      else value = e.value;
      updateMovie({ ...movie, [f.name]: value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (Object.values(movie).every((x) => x)) {
      dispatch(createMovie(movie));
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
                    <FormElement
                      disabled={loading}
                      onChange={updateField}
                      label="Movie Title"
                      value={movie.title}
                      name="title"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <FormElement
                      disabled={loading}
                      onChange={updateField}
                      value={movie.cast}
                      label="Cast"
                      name="cast"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <label>
                      <small>Choose Genre</small>
                    </label>
                    <Select
                      name="genre"
                      defaultValue={movie.genre}
                      options={metadata.genre.map((x) => ({ label: x, value: x }))}
                      onChange={updateField}
                      required
                      isDisabled={loading}
                    />
                  </Col>
                  <Col md={12}>
                    <label>
                      <small>Choose Audio Languages</small>
                    </label>
                    <Select
                      name="language"
                      isMulti
                      defaultValue={movie.language.split(",")}
                      options={metadata.languages.map((x) => ({ label: x, value: x }))}
                      onChange={updateField}
                      required
                      isDisabled={loading}
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
