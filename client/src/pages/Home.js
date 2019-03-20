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
        //setState from empty array to array of articles from api calls
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

  handleClear = event => {

    //call api to clear articles from website
    axios.put("/clearArticles").then(response => {

        this.setState({
            scraped: []
        });
    });
  }

  render() {
    return (
      <div>
        < Navbar 
            handleClear={this.handleClear}
        />
        < Jumbotron />
        < Main 
            handleScrape={this.handleScrape} 
            scrapedArticles={this.state.scraped}
        />
        {/* < Footer /> */}
      </div>
    );
  }
}

export default Home;
