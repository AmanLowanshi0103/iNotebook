import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host="http://localhost:5000"

function Login(props) {
  let History=useNavigate()
  const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

  const handleSubmit=async(e)=>
    {
      e.preventDefault()
      const response = await fetch(`${host}/api/user/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Email,Password}),
      });
      const jason= await response.json();
      console.log(jason)
      if(jason.success)
        {
          localStorage.setItem('token',jason.token)
          History("/")
          props.showAlert(" Successfully Login","success")
        }
      else
      {
        props.showAlert(" Invalid Login Credentials","danger")
      }
    }
  return (<>
    <form onSubmit={handleSubmit}>
      <div class="mb-3 my-2">
        <label htmlFor="email" class="form-label">Email address</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email"  aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="password" class="form-label">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" name='password'/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </>
  )
}

export default Login
