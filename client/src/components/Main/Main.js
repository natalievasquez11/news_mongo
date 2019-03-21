import React from "react";
import "./style.css";

function Main(props) {
    return(
        <div className="container center-align">
            <a className={props.scrapedArticles.length === 0 ? "btn-large" : "btn-large disabled"} 
            onClick={props.handleScrape}>
                Click here to scrape NPR articles
            </a>
            {props.scrapedArticles.map(articleRes => (
                <div className="row">
                    <div className="col s11">
                        <a href={articleRes.link} target="_blank">
                            <div className="card-panel left-align grey lighten-5">
                                <span className="black-text">
                                    <h6><strong>{articleRes.headline}</strong></h6>
                                    <p>{articleRes.summary}</p>
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="col s1 valign-wrapper">
                        <a id={articleRes._id}className="btn" onClick={props.handleSave}>SAVE</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Main;