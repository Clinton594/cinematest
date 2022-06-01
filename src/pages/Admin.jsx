import React from "react";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { Col, Row, Content, Aside, Ul, Li, Container, Button } from "../components/Elements";
import BookingIcon from "../components/Icons/Booking";
import Movie from "../components/Icons/Video";
import MovieCard from "../components/MovieCard";
import Add from "../components/Icons/Add";

export default function Admin() {
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
                    <div>
                      <Movie />
                      <span>Movies</span>
                    </div>
                  </Li>
                  <Li>
                    <div>
                      <BookingIcon />
                      <span>Bookings</span>
                    </div>
                  </Li>
                </Ul>
              </Aside>
            </Col>
            <Col md={10}>
              <Section className="card px-4">
                <Container>
                  <Content id="id">
                    <h5>Showing a list of uploaded Movies</h5>
                    <hr />
                    <Row>
                      <Col md={3} sm={6}>
                        <MovieCard />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mt-4 d-flex justify-content-end" md="12">
                        <Button variant="warning">
                          <Add /> <span> New Movie</span>
                        </Button>
                      </Col>
                    </Row>
                  </Content>
                  <Content>yes</Content>
                </Container>
              </Section>
            </Col>
          </Row>
        </Section>
      </Content>
    </main>
  );
}
