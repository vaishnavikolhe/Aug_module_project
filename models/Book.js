const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookShema = new Schema({
    title:{
        type:String,
        require:true,
    },
    bookAuthor:{
        type:String,
        require:true,
    },
    bookPrice:{
        type:String,
        require:true,
    },
    bookCategory:{
        type:String,
        require:true,
    },
})

module.exports = mongoose.model("books",BookShema);
