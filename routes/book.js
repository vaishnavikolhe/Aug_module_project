const express = require("express");
const router = express();
const { isAuth } = require("../middlewares/AuthMiddleware");
const { addBook, getBooks, deletebook, updateBook } = require("../controllers/book.controller");
const BASE_URL = process.env.BASE_URL 
router.post(`${BASE_URL}/addbook`, addBook);
router.get(`${BASE_URL}/getbooks`, getBooks);
router.put(`${BASE_URL}/updatebook/:id`,updateBook);
router.delete(`${BASE_URL}/deletebook/:id`,deletebook);

module.exports = router;