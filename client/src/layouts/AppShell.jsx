import React from "react";
import { Link } from "react-router-dom";
const AppShell = ({ children }) => {
  return (
    <main>
      <header className="flex-container header">
        <Link to="/home" className="heading-l">
          Interactive Comments
        </Link>
        <Link to="/login">Login</Link>
      </header>
      {children}
    </main>
  );
};

export default AppShell;
