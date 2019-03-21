import React, { Component } from 'react';
import SavedNav from "../components/Navbar/SavedNav";
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import SavedJumbotron from "../components/SavedJumbotron/SavedJumbotron";
import SavedArticles from "../components/SavedArticles/SavedArticles";


class Saved extends Component {

    render() {
        return (
          <div>
            < SavedNav />
            < SavedJumbotron />
            

            {/* < Footer /> */}
          </div>
        );
      }
}

export default Saved;