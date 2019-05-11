import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function CommentNav(props) {
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">NPR News Web Scraper</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" className="waves-effect waves-light btn">HOME</a></li>
            <li><Link to="/saved" className="waves-effect waves-light btn">SAVED ARTICLES</Link></li>
          </ul>
        </div>
      </nav>
    );
}

export default CommentNav;