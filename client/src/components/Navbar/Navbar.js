import React from "react";
import "./style.css";

function Navbar() {
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">NPR News Web Scraper</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a className="btn waves-effect waves-light">SCRAPE</a></li>
            <li><a className="waves-effect waves-light btn">CLEAR</a></li>
            <li><a className="waves-effect waves-light btn">SAVED ARTICLES</a></li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;