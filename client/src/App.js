import React, { Component } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";


class App extends Component {
  state = {
    scraped: []
  }



  render() {
    return (
      <div>
        < Navbar />
        < Jumbotron />
        < Main />
        < Footer />
      </div>
    );
  }
}

export default App;
