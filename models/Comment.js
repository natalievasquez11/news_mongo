var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create new CommentSchema object
var CommentSchema = new Schema({
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});

//create model from comment schema
var Comment = mongoose.model("Comment", CommentSchema);
//export model
module.exports = Comment;