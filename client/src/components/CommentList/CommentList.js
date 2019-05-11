import React from "react";
import "./style.css";

function CommentList(props) {
    return(
        <div className="container center-align">
            { !props.articleCommentState || props.articleCommentState.length === 0 ?
                <div className="row">
                    <div className="col s12">
                        <h2>0 Comments</h2>
                    </div>
                </div>
                :
                <div>
                    {props.articleCommentState.map((commentResults, index) => (
                        <div className="row" key={index}>
                            <div className="col m8 offset-m2">
                                <div className="card-panel left-align grey lighten-5 indComment">
                                    <span className="black-text">
                                        <p>{commentResults.comment}</p>
                                    </span>
                                </div>
                                
                            </div>
                            <button className="waves-light btn delComment" onClick={props.handleDelComment.bind(this, index)}>X</button>
                        </div>    
                    ))}
                    
                </div>    
            }
        </div>
    )
}

export default CommentList;