import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Toaster from "../components/Toaster";
import Section from "../components/Section";
import Movie from "../components/Icons/Video";
import TabMovies from "../components/admin/TabMovies";
import BookingIcon from "../components/Icons/Booking";
import TabBookings from "../components/admin/TabBookings";
import { Col, Row, Content, Aside, Ul, Li } from "../components/Elements";
import { setToast } from "../redux/reducers/toast";
import { resetToast } from "../redux/reducers/shows";

export default function Admin() {
  const dispatch = useDispatch();
  const [tab, toggleTab] = useState(0);
  const {
    shows: { toast },
  } = useSelector((store) => store);

  useEffect(() => {
    if (toast.trigger) {
      dispatch(setToast({ show: true, title: "Notice", message: toast.message, status: toast.status }));
      dispatch(resetToast());
    }
  }, [toast, dispatch]);

  return (
    <main className="dashboard" style={{ backgroundImage: "url(/img/p3.png)", minHeight: "100vh" }}>
      <Navbar />
      <Toaster />
      <Content className="page-content">
        <Section className="mx-4">
          <Row>
            <Col md={2}>
              <Aside>
                <Ul className="css-1ta9ch5">
                  <Li className="css-bjbssn">
                    <div className={(tab === 0 && "active") || ""} onClick={() => toggleTab(0)}>
                      <Movie />
                      <span>Movies</span>
                    </div>
                  </Li>
                  <Li>
                    <div className={(tab === 1 && "active") || ""} onClick={() => toggleTab(1)}>
                      <BookingIcon />
                      <span>Bookings</span>
                    </div>
                  </Li>
                </Ul>
              </Aside>
            </Col>
            <Col md={10}>
              <Section className="card px-4">
                {tab === 0 && <TabMovies />}
                {tab === 1 && <TabBookings />}
              </Section>
            </Col>
          </Row>
        </Section>
      </Content>
    </main>
  );
}
