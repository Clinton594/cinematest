import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, FormElement, Row, Col } from "../Elements";

export default function NewMovie({ toggleShowModal, showModal }) {
  const [swipe, toggleSwipe] = useState("");

  useEffect(() => {
    setTimeout(() => {
      toggleSwipe((showModal && "show") || "");
    }, 100);
  }, [showModal]);
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
                    <FormElement label="Movie Title" name="title" />
                  </Col>
                  <Col md={12}>
                    <FormElement label="Cast" name="cast" />
                  </Col>
                  <Col md={6}>
                    <label>
                      <small>Choose Genre</small>{" "}
                    </label>
                    <Select
                      label=""
                      name="city"
                      defaultValue="one"
                      options={[
                        { value: "one", label: "One" },
                        { value: "two", label: "Two" },
                      ]}
                    />
                  </Col>
                  <Col md={6}>
                    <label>
                      <small>Choose Language</small>{" "}
                    </label>
                    <Select
                      label="Title"
                      name="city"
                      defaultValue="one"
                      options={[
                        { value: "one", label: "English" },
                        { value: "two", label: "French" },
                      ]}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
