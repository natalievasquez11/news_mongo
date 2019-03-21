import React, { Component } from 'react';
import SavedNav from "../components/Navbar/SavedNav";
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import SavedJumbotron from "../components/SavedJumbotron/SavedJumbotron";
import SavedArticles from "../components/SavedArticles/SavedArticles";
import swal from "sweetalert";

class Saved extends Component {
    state = {
        saved: []
    }

    componentDidMount() {
        //API call to retrieve all saved articles
        axios.get("/saved").then(response => {

            this.setState({
                saved: response.data
            });
        });
    }

    handleClearSaved = event => {

        axios.put("/unsaved").then(response => {

            if(this.state.saved.length === 0) {
                swal("Oops!", "There are no articles to remove.", "error");
            } else {
                swal("OK!", "All saved articles have been removed.", "success");
                this.setState({
                    saved: []
                });
            }
        });
    }

    render() {
        return (
          <div>
            < SavedNav 
                handleClearSaved={this.handleClearSaved}
            />
            < SavedJumbotron />
            < SavedArticles 
                savedArticlesState={this.state.saved}
/>
            {/* < Footer /> */}
          </div>
        );
      }
}

export default Saved;