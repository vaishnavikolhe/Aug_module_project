import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBookForm({bookOldData}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTiltle] = useState()
    const [author, setAuthor] = useState()
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    function addBookHandle(e) {
        e.preventDefault()
        const bookData = {
            title: title,
            bookAuthor: author,
            bookPrice: price,
            bookCategory: category
        }
        axios.put(`/updatebook/${id}`, bookData)
            .then((response) => { alert(response.data.message);navigate("/dashboard") })
            .catch((err) => { console.log(err) })
    }
    return (
        <div>
            <div>
                <h2>Update Book</h2>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title"
                    onChange={(e) => { setTiltle(e.target.value) }}
                />
            </div>
            <div>
                <label htmlFor="Author">Author</label>
                <input type="text" name="Author" ixd="Author" className='addbookinput'
                    onChange={(e) => { setAuthor(e.target.value) }}
                />
            </div>
            <div>
                <label htmlFor="Price">Price</label>
                <input type="text" name="Price" id="Price" className='addbookinput'
                    onChange={(e) => { setPrice(e.target.value) }}
                />
            </div>
            <div>
                <label htmlFor="Category">Category</label>
                <input type="text" name="Category" id="Category" className='addbookinput'
                    onChange={(e) => { setCategory(e.target.value) }}
                />
            </div>
            <button className='addbookbutton' onClick={addBookHandle}>Update Book</button>
        </div>
    )
}

export default UpdateBookForm