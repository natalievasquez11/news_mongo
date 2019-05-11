import React from "react";
import "./style.css";

function CommentJumbotron(props) {
    return (
      <header className="header">
        <h1>NPR News</h1>
        <h3>Comments for article:</h3>
        <h4> {props.articleCommentState.headline} </h4>
      </header>
    );
}

export default CommentJumbotron;