import React from "react";
import {Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let History=useNavigate()
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);
  const logOut=()=>
    {
      localStorage.removeItem("token")
      History("/login")
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
              <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} to="/About">
                About
              </Link>
            </div>
            {!localStorage.getItem("token")?<div class="position-absolute top-0 end-0 my-2" >
            <Link class="btn btn-primary me-md-2 mx-1" to="/login" role="button">Login</Link>
            <Link class="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link></div>:<div class="position-absolute top-0 end-0 my-2"><button class="btn btn-primary mx-2" onClick={logOut}>Logout</button></div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
