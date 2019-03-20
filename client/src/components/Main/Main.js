import React from "react";
import "./style.css";

function Main(props) {
    return(
        <div className="container center-align">
            <a className={props.scrapedArticles.length === 0 ? "btn-large" : "btn-large disabled"} onClick={props.handleScrape}>
                Click here to scrape NPR articles
            </a>
            <div className="row">
                <div className="col s12">
                {props.scrapedArticles.map(articleRes => (
                    <a href={articleRes.link} target="_blank">
                        <div className="card-panel left-align">
                            <span className="black-text">
                                <h6><strong>{articleRes.headline}</strong></h6>
                                <p>{articleRes.summary}</p>
                            </span>
                        </div>
                    </a>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Main;