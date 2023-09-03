import React, { useEffect, useState } from 'react'
import BookCard from '../bookcard'
import "./styles.css"
import AddBookForm from '../AddBookForm'
import axios from "axios";
function DashboardPage() {
    const [bookData, setBookData] = useState([]);
    useEffect(() => {
        getBooks()
    }, [])

    function getBooks() {
        try {
            axios.get("/getbooks")
                .then((response) => {
                    setBookData(response.data.data);
                    console.log(bookData)
                })

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h2 className='text'>Inventory Management</h2>
            <div className='line'></div>
            <AddBookForm />
            <div className='line'></div>
            <h2>All Books</h2>
            <div className='bookscardcontainer'>
                {
                    bookData && bookData.length > 0 && bookData.map((book) => (

                        <BookCard
                            id={book._id}
                            title={book.title}
                            author={book.bookAuthor}
                            category={book.bookCategory}
                        />

                    ))
                }
            </div>

        </div>
    )
}

export default DashboardPage