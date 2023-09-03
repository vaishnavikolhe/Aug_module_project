import React, { useState } from 'react'
import "./styles.css"
import axios from "axios";
function RegisterForm() {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    function handleSubmit(e){
        e.preventDefault();
        const userObj = {
            name,
            username,
            password,
            email,
        }
        axios
      .post("/registration", userObj)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === 201) {
          window.location.href = "/login";
        } else {
            console.log(res.data)
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    }
    return (
        <>
            <center> <h1> Register Form </h1> </center>
            <form >
                <div className="container">
                    <label htmlFor="name">Name : </label>
                    <input type="text" placeholder="Enter Name" name="name" required 
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <label htmlFor="email">Email : </label>
                    <input type="text" placeholder="Enter Email" name="email" required 
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <label htmlFor="username">Username : </label>
                    <input type="text" placeholder="Enter Username" name="username" required 
                        onChange={(e)=>{setUsername(e.target.value)}}
                    />
                    <label htmlFor="password">Password : </label>
                    <input type="password" placeholder="Enter Password" name="password" required 
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <button type="submit" onClick={handleSubmit}>Register</button>
                </div>
            </form>
        </>
    )
}

export default RegisterForm