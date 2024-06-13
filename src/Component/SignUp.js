import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host="http://localhost:5000"

const SignUp = (props) => {
  const [FullName,setFullName]=useState("")
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  let History=useNavigate()
  const handleOnSubmit =async(e)=>
  {
    e.preventDefault()
    // console.log(FullName,Email,Password)
    const response = await fetch(`${host}/api/user/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Name:FullName,Email,Password}),
    });
    const jason= await response.json();
    console.log(jason)
    if(jason.success)
      {
        localStorage.setItem('token',jason.token)
        History("/")
        props.showAlert(" Account created successfully","success")
      }
    else
    {
      props.showAlert(" Invalid Credentials","danger")
    }
  }

  return (
    <>
  <form onSubmit={handleOnSubmit}>
  <div class="mb-3">
    <label for="fullName" class="form-label">Full Name</label>
    <input type="text" onChange={(e) => setFullName(e.target.value)} class="form-control" id="fullName" name="fullName" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" name="email" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="password" name="password" />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    </>
  )
}

export default SignUp
