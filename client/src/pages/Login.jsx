import React, { Fragment } from "react";

import { useState } from "react";
import { Redirect } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3500/api/v1/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.status === "success" && data.token) {
      setIsLoggedIn(true);
    }
  };
  return (
    <Fragment>
      {isLoggedIn && <Redirect to="/home" />}
      <form className="form">
        <h1 className="heading-l">Interactive Comments</h1>
        <label className="text-input">
          <p className="heading-m">Email</p>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            placeholder="Email"
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
