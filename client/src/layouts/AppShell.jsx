import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";
import NotificationCard from "../components/NotificationCard";
const AppShell = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notifs = useSelector((state) => state.ui.notifs);
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  useEffect(() => {
    console.log("shell use effect");
    return () => {};
  }, []);

  return (
    <main>
      <ul className="notifications">
        {notifs.map((notif) => (
          <NotificationCard notif={notif} key={notif.id} />
        ))}
      </ul>
      <header className="flex-container header">
        <Link to="/home" className="heading-l">
          Interactive Comments
        </Link>
        <div className="flex-container gap-s">
          {auth.isAuthenticated ? (
            <>
              <Link to="/profile" className="btn">
                Profile
              </Link>
              <button className="btn btn--border" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--border">
                Login
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </main>
  );
};

export default AppShell;
