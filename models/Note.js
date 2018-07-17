var mongoose = require("mongoose");

var Schema = mongoose.Schema;


// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model

var NoteSchema = new Schema({
  // title is of type String

  body: {
      type: String
  }, 
  date: {
      type: Date,
      default: Date.now
  },
  article: {
      type: Schema.Types.ObjectId,
      ref: "Article"
  }
// text: String (only thing on here before)

});

var Note = mongoose.model("Note", NoteSchema);


module.exports = Note; // Export the Note model