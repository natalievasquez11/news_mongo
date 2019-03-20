import React, { Component } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import axios from 'axios';


class Home extends Component {
  state = {
    scraped: []
  }

  componentDidMount() {
    return this.state.scraped;
  }

  handleScrape = event => {

    //scrape the news website
    axios.get("/scrape").then(response => {

      //get articles scraped
      axios.get("/articles").then(response => {

        this.setState({
          scraped: response.data
        });

      }).catch(function(err) {
        console.log(err);
      });

    }).catch(function(err) {
      console.log(err);
    });


  }

  render() {
    return (
      <div>
        < Navbar />
        < Jumbotron />
        < Main 
          handleScrape={this.handleScrape} 
          scrapedArticles={this.state.scraped}/>
        {/* < Footer /> */}
      </div>
    );
  }
}

export default Home;
