import React, { Component } from 'react';
import SavedNav from "../components/Navbar/SavedNav";
import Footer from "../components/Footer/Footer";
import axios from 'axios';

class Saved extends Component {

    render() {
        return (
          <div>
            < SavedNav />

            {/* < Footer /> */}
          </div>
        );
      }
}

export default Saved;