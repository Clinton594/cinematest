import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Toaster from "../components/Toaster";
import { setToast } from "../redux/reducers/toast";
import { Button, Form } from "../components/Elements";
import { login, offToast } from "../redux/reducers/user";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";
import route from "../constants/routes";

export default function Login() {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const { user } = useSelector((store) => store);

  const updateField = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const loginForm = async (e) => {
    e.preventDefault();
    if (formdata.email && formdata.password) {
      dispatch(login(formdata));
    } else {
      dispatch(setToast({ status: false, show: true, title: "Login", message: "Email or Password is Empty" }));
    }
  };

  useEffect(() => {
    if (user.toast.trigger && !user.toast.status) {
      dispatch(offToast());
      dispatch(setToast({ status: user.toast.status, show: true, title: "Login", message: user.toast.message }));
    }
  }, [user.toast, dispatch, offToast]);

  if (user.isLoggedIn === true) {
    return <Navigate to={route.dashboard} />;
  }
  return (
    <>
      <main className="login" style={{ backgroundImage: "url(/img/p3.png)", minHeight: "100vh" }}>
        <Navbar />
        <Toaster />
        <div className="row">
          <div className="col-md-1 col-lg-8 d-none d-lg-block">
            <img
              className="movedown"
              style={{ marginLeft: "20%" }}
              width="60%"
              src="img/authentication-rafiki.png"
              alt=""
            />
            <div className="vr"></div>
          </div>
          <div className="col-md-8 col-lg-4 offset-md-2 offset-lg-0">
            <div className="login-containter">
              <div>
                <h3 className="css-xc349t">Welcome to CinemaTest</h3>
                <p className="css-19cqx3h">Please sign-in to your account and start the adventure</p>
              </div>
              <div className="w-100">
                <Form onSubmit={loginForm} className="w-100">
                  <div className="form-element">
                    <div className="form-control">
                      <input
                        required
                        onChange={updateField}
                        type="email"
                        defaultValue={formdata.email}
                        name="email"
                        id="email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="form-element">
                    <div className="form-control">
                      <input
                        onChange={updateField}
                        type="password"
                        defaultValue={formdata.password}
                        name="password"
                        id="email"
                        required
                      />
                      <label htmlFor="email">Password</label>
                    </div>
                  </div>
                  <div className="form-element">
                    <Button className="w-100 d-flex align-items-center" variant="danger">
                      Login{" "}
                      {user.loading && <Spinner className="ml-3" variant="warning" animation="border" size="sm" />}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
