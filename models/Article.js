var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    
    
    title: {
        type: String,
        required: true, 
        unique: true,
    },
    
    link: {
        type: String, 
        required: true, 
        unique: true,
    }, 

    summary: {
        type: String, 
        required: true,
        unique: false,

    },

    image: {
        type: String, 
        required: true, 

    },

    isSaved: {
        type: Boolean, 
        default: false, 
        required: false, 
        unique: false,

    },

    note: {
        type: [{ 
            type: Schema.Types.ObjectId, 
            ref: "Note"
        }]
    }


});


//  Create model from the schema using the mongoose model method

var Article = mongoose.model("Article", ArticleSchema);

// Exporting Article

module.exports = Article;