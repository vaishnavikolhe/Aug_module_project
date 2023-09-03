
const Book = require("../models/Book");

const addBook = async (req, res) => {
    
    const bookObj = new Book({
        title: req.body.title,
        bookAuthor: req.body.bookAuthor,
        bookPrice:req.body.bookPrice,
        bookCategory:req.body.bookCategory
    })
    try {
        await bookObj.save();
        res.status(201).send({ status: 201, message: "New Book Saved Successfully !" })
    } catch (err) {
        res.status(400).send({ status: 400, message: "Book Creation Failed !" })
    }
}

const getBooks = async (req, res) => {
    try {
        const booksData = await Book.find()
        res.status(200).send({
            status:200, message: "Books Fetached Successfully !", data: booksData
        })
    } catch (err) {
        console.log("Error = ", err);
        res.status(400).send({ status: 400, message: "Failed to get books !" })
    }
}

const updateBook = async (req, res) => {
    const { title, bookAuthor,bookPrice,bookCategory } = req.body;
    const bookId = req.params.id
    try {
        const newBookData = {
            title, bookAuthor,bookPrice,bookCategory 
        }
        await Book.findByIdAndUpdate({ _id: bookId }, newBookData);
        res.status(200).send({ status: 200, message: "Book Updated successfully !" })
    } catch (err) {
        // console.log(err)
        res.status(400).send({ status:400, message: "Cannot update Book !" })
    }
}

const deletebook = async (req, res) => {
    const id = req.params.id;
    try {
        await Book.deleteOne({ _id: id })
        res.status(200).send({ status: 200, message: "Book is successfully deleted !" })
    } catch (err) {
        console.log(err)
        res.status(400).send({ status: 400, message: "Unable to delete Book" })
    }
}

module.exports = { addBook,getBooks ,updateBook,deletebook};