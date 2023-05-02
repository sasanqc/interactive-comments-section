import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";
const Signup = () => {
  const [form, setForm] = useState({});
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      dispatch(
        uiActions.addNotif({
          title: "Please provide all required fields",
          id: uuid(),
        })
      );
      return;
    }
    dispatch(signup(form));
  };
  return (
    <Fragment>
      {auth.isAuthenticated && <Redirect to="/home" />}
      <form className="form">
        <h1 className="heading-l">Interactive Comments</h1>
        <h1 className="heading-l">Signup</h1>
        <p className="body">
          Already have an account?
          <Link className="link" to="login">
            Login
          </Link>
        </p>
        <br />

        <label className="text-input">
          <p className="heading-m">Username</p>
          <input
            type="text"
            name="username"
            value={form.username || ""}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </label>
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
        <label className="text-input">
          <p className="heading-m">Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword || ""}
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
        </label>
        <div className="form__submit">
          <button className="btn btn--fill-blue" onClick={handleSubmitForm}>
            Sing up
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
