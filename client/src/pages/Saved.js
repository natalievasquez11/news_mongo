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

    handleDeleteArticle = event => {
        const id = event.target.id;

        axios.put("/unsaveArticle/" + id).then(response => {

            axios.get("/saved").then(response => {
                swal("OK!", "Article removed.", "success");
                this.setState({
                    saved: response.data
                });
                  
            });
        });
    }

    render() {
        return (
          <div className='pageContainter'>
            < SavedNav 
                handleClearSaved={this.handleClearSaved}
            />
            < SavedJumbotron />
            < SavedArticles 
                savedArticlesState={this.state.saved}
                handleDeleteArticle={this.handleDeleteArticle}
            />
            < Footer />
          </div>
        );
      }
}

export default Saved;