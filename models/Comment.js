const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
const CommentSchema = new Schema({
  // `user` is of type String and is required
  user: {
      type: String,
      required: true
  },

  // `title` is of type String and is required
  title: {
    type: String, 
    required: true
  },

  // `authored` is of type Date
  authored: {
    type: Date,
    default: Date.now
  },

  // `body` is of type String and is required
  body: {
    type: String,
    required: true
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
