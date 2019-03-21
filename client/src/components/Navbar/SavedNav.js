import React from "react";
import "./style.css";

function SavedNav(props) {
    return (
        <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">NPR News Web Scraper</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a className="waves-effect waves-light btn" onClick={props.handleClearSaved}>CLEAR ALL</a></li>
            <li><a href="/" className="waves-effect waves-light btn">HOME</a></li>
          </ul>
        </div>
      </nav>
    );
}

export default SavedNav;