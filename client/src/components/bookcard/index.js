import React from 'react';
import { useNavigate } from "react-router-dom"
import './styles.css';
import axios from 'axios';

const BookCard = ({ id, title, author, category }) => {
  const navigate = useNavigate();
  function deleteBookHandle(){
    axios.delete(`/deletebook/${id}`)
    .then((response)=>{
      alert(response.data.message);
      window.location.reload();
    })
    .catch((err)=>{console.log(err)})
  }
  return (
    <div className="book-card">
      <div className="book-card-header">
        <h2>{title}</h2>
      </div>
      <div className="book-card-info">
        <p>By: {author}</p>
        <p><strong>{category}</strong></p>
      </div>
      <div className="book-card-actions">
        <button onClick={() => { navigate(`/updatebook/${id}`) }}>Update</button>
        <button onClick={deleteBookHandle}
          style={{ backgroundColor: 'red' }}
        >Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
