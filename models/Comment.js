"use strict";

const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
const CommentSchema = new Schema({
  // `authoredby` is of type String and is required
  authoredby: {
      type: String,
      required: true,
      trim: true
  },

  // `commenttitle` is of type String and is required
  commenttitle: {
    type: String, 
    required: true,
    trim: true
  },

  // `authoredon` is of type Date
  authoredon: {
    type: Date,
    default: Date.now
  },

  // `body` is of type String and is required
  body: {
    type: String,
    required: true,
    trim: true
  },

  // `articleid` is of type Schema.Types.ObjectId and is required
  articleid: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
