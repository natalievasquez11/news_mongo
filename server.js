var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var db = require("./models");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
//initialize express
var app = express();

var port = process.env.PORT || 8000;

//use morgan logger for logging requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make public a static folder
//app.use(express.static("public"));

app.use(express.static("client/build"));

//connect to mongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nprArticleDB";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function(response) {
        var $ = cheerio.load(response.data);

        $(".item-info").each(function(i, element) {

            var result = {};

            result.headline = $(this).children(".title").text();
            result.summary = $(this).children(".teaser").text();
            result.link = $(this).children(".title").children("a").attr("href");

            //empty collection every time scrape button is click so same articles don't get scraped more than once.
            db.Article.remove({})
            .then(function(dbArticle) {
                res.json(dbArticle);
            }).catch(function(err) {
                res.json(err);
            });

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                }).catch(function(err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
}); 

app.put("/clearArticles", function(req, res) {

    db.Article.remove({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get("/saved", function(req, res) {

    db.Article.find({ saved: true })
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/saveArticle/:id", function(req, res) {

    db.Article.update(
        { _id: req.params.id},
        { $set: 
            { saved: true }
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/unsaveArticle/:id", function(req, res) {
    
    db.Article.update(
        { _id: req.params.id},
        { $set:
            { saved: false }
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/unsaved", function(req, res) {

    db.Article.updateMany(
        {},
        { $set: {
            saved: false }
        },
        { multi: true }
    ).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get("/get-comments/:id", function(req, res) {

    console.log('getting article w/comments');

    db.Article.find({ _id: req.params.id })
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/comment/:id", function(req, res) {

    db.Article.update({
        _id: req.params.id,
        saved: true
    }, {
        $push: { 
            comments: { comment: req.body.comment}
        }
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/uncomment/:id", function(req, res) {

    db.Article.updateOne({
        _id: req.params.id,
        saved: true
    }, {
        $pull: {
            comments: { _id: req.body.id }
        }
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(port, function() {
    console.log("app running on port 8000");
});
