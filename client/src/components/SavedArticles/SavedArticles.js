import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function SavedArticles(props) {
    return(
        <div className="container center-align">
            {props.savedArticlesState.length === 0 ? 
            <div className="row">
                <div className="col s12">
                    <h2>No articles have been saved.</h2>
                </div>
            </div>
            :
            <div>
                {props.savedArticlesState.map((articleRes, index) => (
                    <div className="row" key={index}>
                        <div className="col s10">
                            <a href={articleRes.link} target="_blank" rel="noopener noreferrer">
                                <div className="card-panel left-align grey lighten-5">
                                    <span className="black-text">
                                        <h6 key={index}><strong>{articleRes.headline}</strong></h6>
                                        <p>{articleRes.summary}</p>
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="col s1 valign-wrapper">
                            <a id={articleRes._id} className="btn" onClick={props.handleDeleteArticle}>DELETE</a>
                            <br />
                        </div>
                        <div className="col s1 valign-wrapper">
                            <br />
                            <Link to={"/comments/"+ articleRes._id} className="btn commentBtn">COMMENTS</Link>
                        </div>
                    </div>
                ))}
            </div>
            }
            
        </div>
    );
}

export default SavedArticles;