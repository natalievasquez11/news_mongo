import React, { Component } from "react";
import CommentNav from "../components/Navbar/CommentNav";
import CommentForm from "../components/CommentForm/CommentForm";
import axios from "axios";
import CommentJumbotron from "../components/Jumbotron/CommentJumbotron";
import Footer from "../components/Footer/Footer";
import CommentList from "../components/CommentList/CommentList";
import swal from "sweetalert";
import "./style.css";

class Comments extends Component {
    constructor() {
        super();
        this.id = "";
    }

    state = {
        article : {},
        commentInput : ""
    }
    
    componentDidMount() {
        this.id = this.props.match.params.id;

        axios.get(`/get-comments/${this.id}`).then(response => {

            if(response && response.data && response.data.length > 0) {

                this.setState({
                    article : response.data[0]
                });
            }
        }).catch(function(err) {
            console.log(err);
        });
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
          [name]: value
        });
    }

    handleFormSubmit = event => {

        event.preventDefault();
        document.getElementById("commentId").reset();

        axios.put(`/comment/${this.id}`, { comment: this.state.commentInput })
        .then(response => {

            axios.get(`/get-comments/${this.id}`).then(response => {

                swal("OK!", "Your comment has been saved.", "success");
                this.setState({
                    article: response.data[0]
                });
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }

    handleDelComment = (index, event) => {
         event.preventDefault();

         swal({
            title: "Are you sure?",
            text: "Once deleted, this comment will be removed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

            axios.get(`/get-comments/${this.id}`).then(response => {

                axios.put(`/uncomment/${this.id}`, { id: response.data[0].comments[index]._id }).then(res => {

                    axios.get(`/get-comments/${this.id}`).then(resp => {

                        swal("The comment has been deleted!", {
                            icon: "success",
                        });

                        this.setState({
                            article: resp.data[0]
                        });
                    }).catch(function(err) {
                        console.log(err);
                    });
                }).catch(function(err) {
                    console.log(err);
                });
            }).catch(function(err) {
                console.log(err);
            });
            } else 
            {
                swal("Your comment is safe!");
            }
        });

    }


    render() {
        return(
            <div className='pageContainer'>
                < CommentNav />
                < CommentJumbotron 
                    articleCommentState = {this.state.article}
                />
                < CommentForm 
                    handleFormSubmit = {this.handleFormSubmit}
                    handleInputChange = {this.handleInputChange}
                    name = "commentInput"
                    value = {this.state.commentInput}
                />
                < CommentList 
                    articleCommentState = {this.state.article.comments}
                    handleDelComment = {this.handleDelComment}
                />
                < Footer />
            </div>
        );
    }
}

export default Comments;