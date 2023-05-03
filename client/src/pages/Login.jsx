import React, { Fragment } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      dispatch(
        uiActions.addNotif({
          title: "Please provide email and password",
          id: uuid(),
        })
      );
      return;
    }
    dispatch(login(form));
  };

  return (
    <Fragment>
      {auth.isAuthenticated && <Redirect to="/home" />}
      <form className="form">
        <h1 className="heading-l">Interactive Comments</h1>
        <h1 className="heading-l">Login</h1>
        <p className="body">
          Don't have an account?
          <Link className="link" to="signup">
            Sing Up
          </Link>
        </p>
        <br />
        <label className="text-input">
          <p className="heading-m">Email (Fake emails are accepted)</p>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            placeholder="Fake Email"
            onChange={handleChange}
            required
          />
        </label>
        <label className="text-input">
          <p className="heading-m">Password</p>
          <input
            type="password"
            name="password"
            value={form.password || ""}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </label>
        <div className="form__submit">
          <button className="btn btn--fill-blue" onClick={handleSubmitForm}>
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
