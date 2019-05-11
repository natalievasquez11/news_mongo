import React, { Component } from 'react';
import SavedNav from "../components/Navbar/SavedNav";
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import SavedJumbotron from "../components/SavedJumbotron/SavedJumbotron";
import SavedArticles from "../components/SavedArticles/SavedArticles";
import swal from "sweetalert";
import "./style.css";

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

        swal({
            title: "Are you sure?",
            text: "Once deleted, this article will be removed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

            axios.put("/unsaveArticle/" + id).then(response => {
                axios.get("/saved").then(response => {

                    swal("The article has been deleted!", {
                    icon: "success",
                    });

                    this.setState({
                        saved: response.data
                    });
                });
            });
            } else 
            {
                swal("Your article is safe!");
            }
        });                  

    }

    render() {
        return (
          <div className='pageContainer'>
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