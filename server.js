var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var db = require("./models");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
//initialize express
var app = express();

//use morgan logger for logging requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make public a static folder
//app.use(express.static("public"));

app.use(express.static("client/build"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/nprArticleDB", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function(response) {
        var $ = cheerio.load(response.data);

        $(".item-info").each(function(i, element) {

            var result = {};

            result.headline = $(this).children(".title").text();
            result.summary = $(this).children(".teaser").text();
            result.link = $(this).children(".title").children("a").attr("href");

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

app.get("/saved", function(req, res) {

    db.Article.find({ saved: true })
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/api/saved/:id", function(req, res) {

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

app.put("/api/unsaved", function(req, res) {

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

app.get("/articles/:id", function(req, res) {

    db.Article.findOne({
        _id: req.params.id
    }).populate("comments")
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    
    db.Comment.create(req.body)
    .then(function(dbComment) {
        return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { comments: dbComment },
        { new: true }
        )}).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put("/api/uncomment/:id", function(req, res) {

    db.Comment.remove({
        _id: req.params.id
    }).then(function(dbComment) {
        res.json(dbComment);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(8000, function() {
    console.log("app running on port 8000");
});
