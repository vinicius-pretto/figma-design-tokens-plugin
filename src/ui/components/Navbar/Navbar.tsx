import * as React from "react";

const Navbar = () => {
  return (
    <nav className="border-bottom p-sm">
      <ul className="d-flex flex-row p-0">
        <li>
          <a href="#" className="section-title">
            Tokens
          </a>
        </li>
        <li>
          <a href="#" className="label pr-md">
            CSS
          </a>
        </li>
        <li>
          <a href="#" className="label pr-md">
            SCSS
          </a>
        </li>
        <li>
          <a href="#" className="label pr-md">
            JSON
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
