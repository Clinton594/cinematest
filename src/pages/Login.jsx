import React from "react";
import Navbar from "../components/Navbar";
import { Button, Form } from "../components/Elements";

export default function Login() {
  return (
    <main className="bg-dark login" style={{ backgroundImage: "url(/img/p3.png)", minHeight: "100vh" }}>
      <Navbar />
      <div className="row">
        <div className="col-md-1 col-lg-8 d-none d-lg-block">
          <img
            className="movedown"
            style={{ marginLeft: "20%" }}
            width="60%"
            src="img/authentication-rafiki.png"
            alt=""
          />
        </div>
        <div className="col-md-8 col-lg-4 offset-md-2 offset-lg-0">
          <div className="login-containter">
            <div>
              <h3 className="css-xc349t">Welcome to CinemaTest</h3>
              <p className="css-19cqx3h">Please sign-in to your account and start the adventure</p>
            </div>
            <div className="w-100">
              <Form className="w-100">
                <div className="form-element">
                  <div className="form-control">
                    <input type="email" name="email" id="email" required />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="form-element">
                  <div className="form-control">
                    <input type="password" name="password" id="email" required />
                    <label htmlFor="email">Password</label>
                  </div>
                </div>
                <div className="form-element">
                  <Button className="w-100" variant="danger">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
