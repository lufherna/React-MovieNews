// this requires mongoose
var mongoose = require('mongoose');
// create schema
var Schema = mongoose.Schema;

// Create a new article schema
// use code below as a constructor
var articleSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},

	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	}
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", articleSchema);

// Export the model
module.exports = Article;