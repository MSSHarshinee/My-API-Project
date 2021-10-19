
const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(

        {
            id: Number,
            name : String,
            books : [String]

        }

)

const AuthorModel = mongoose.model("Author",AuthorSchema);

module.exports = AuthorModel;
