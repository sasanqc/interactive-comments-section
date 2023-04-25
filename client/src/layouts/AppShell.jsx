import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth-slice";
const AppShell = ({ children }) => {
  // console.log("AppShell RENDERING");
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <main>
      <header className="flex-container header">
        <Link to="/home" className="heading-l">
          Interactive Comments
        </Link>
        {auth.isAuthenticated ? (
          <button className="btn btn--border" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn--border">
            Login
          </Link>
        )}
      </header>
      {children}
    </main>
  );
};

export default AppShell;
