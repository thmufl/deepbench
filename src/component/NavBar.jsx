import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/model">Model</Link>
      </li>
      <li>
        <Link to="/layers">Layers</Link>
      </li>
    </ul>
  );
};

export default NavBar;
