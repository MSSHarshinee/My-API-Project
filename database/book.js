const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(

        {
            ISBN : String,
            title : String,
            pubDate : String,
            language: String,
            numPage: String,
            author:[Number],
            publication : [Number],
            category:[String]
        }

)

const bookModel = mongoose.model("books",BookSchema);

module.exports = bookModel;
