import React, { Component } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import axios from 'axios';
import swal from 'sweetalert';


class Home extends Component {
  state = {
    scraped: []
  }

  componentDidMount() {

    axios.get("/articles").then(response => {

        this.setState({
          scraped: response.data
        });

      }).catch(function(err) {
        console.log(err);
      });
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
        
        if(this.state.scraped.length === 0) {
            swal("Oops!", "There are no articles to remove", "error");
        } else {
            this.setState({
                scraped: []
            });
            swal("OK!", "All articles have been removed.", "success");
        }
        
    });
  }

  handleSave = event => {
    const id = event.target.id;

    axios.put("/saveArticle/" + id).then(response => {
        swal("Nice!", "Article saved", "success");
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
            handleSave={this.handleSave}
        />
        {/* < Footer /> */}
      </div>
    );
  }
}

export default Home;
