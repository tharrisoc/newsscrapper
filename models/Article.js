"use strict";

const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
  },
  // `url` is required and of type String
  url: {
    type: String,
    required: true,
  },
  // `byline` is required and of type String
  byline: {
    type: String,
    required: true
  },
  // `content` is required and of type String
  content: {
    type: String,
    required: true
  },
  // `comments` is an array that stores an array of one or more
  // ObjectIds that are associated with Comment objects
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with associated Comments
  comments: [
     {
       type: Schema.Types.ObjectId,
       ref: "Comment"
     } 
  ]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
