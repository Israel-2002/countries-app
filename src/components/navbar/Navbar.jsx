import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container container">
        <Link to="/" className="nav__logo">
          <h3>Around the world</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
