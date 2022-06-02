import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { Col, Row, Content, Aside, Ul, Li, Container, Button } from "../components/Elements";
import BookingIcon from "../components/Icons/Booking";
import Movie from "../components/Icons/Video";
import TabMovies from "../components/admin/TabMovies";
import TabBookings from "../components/admin/TabBookings";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import route from "../constants/routes";

export default function Admin() {
  const [tab, toggleTab] = useState(0);
  const { user } = useSelector((store) => store);
  if (!user.isLoggedIn) {
    return <Navigate to={route.home} />;
  }
  return (
    <main className="dashboard" style={{ backgroundImage: "url(/img/p3.png)", minHeight: "100vh" }}>
      <Navbar />
      <Content className="page-content">
        <Section className="mx-4">
          <Row>
            <Col md={2}>
              <Aside>
                <Ul className="css-1ta9ch5">
                  <Li className="css-bjbssn">
                    <div onClick={() => toggleTab(0)}>
                      <Movie />
                      <span>Movies</span>
                    </div>
                  </Li>
                  <Li>
                    <div onClick={() => toggleTab(1)}>
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
