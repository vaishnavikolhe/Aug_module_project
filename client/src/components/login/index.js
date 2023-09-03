import React, { useEffect, useState } from 'react'
import "./login.css"
import axios from 'axios';

const LoginForm = () =>{

  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginObj = {
      loginId,
      password,
    };
    console.log("loginData = ",loginObj)
    axios
      .post("/login", loginObj)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        if (res.data.status === 200) {
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login-page">
      <center> <h1> Login Form </h1> </center>
      <form action='/login' method="POST">
        <div class="container">
          <label for="loginId">Email or Username : </label>
          <input type="text" placeholder="Enter Email or Username" name="loginId" required 
            onChange={(e)=>{setLoginId(e.target.value)}}
          />
          <label for="password">Password : </label>
          <input type="password" placeholder="Enter Password" name="password" required 
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button type="submit" onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm