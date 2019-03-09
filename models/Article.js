var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create new ArticleSchema object
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

//create model from article schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;