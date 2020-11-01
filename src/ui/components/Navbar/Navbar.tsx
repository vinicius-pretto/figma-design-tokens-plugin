import * as React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#" className="section-title">
            Tokens
          </a>
        </li>
        <li>
          <a href="#" className="label">
            CSS
          </a>
        </li>
        <li>
          <a href="#" className="label">
            SCSS
          </a>
        </li>
        <li>
          <a href="#" className="label">
            JSON
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
