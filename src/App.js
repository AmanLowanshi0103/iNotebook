import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Alert from "./Component/Alert"
import noteContext from "./Context/notes/noteContext";
import { useState, useEffect, useLayoutEffect } from "react";
const host="http://localhost:5000"

function App() {
  const Intialnotes = [];
  const [Notes, setNotes] = useState(Intialnotes);
  const [alert,setAlert]=useState(null)
  const showAlert=(message,type)=>(
    setAlert({
      message:message,
      type:type
    })
)
  // Get All the Notes
  const getAllNotes=async()=>
  {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("token"),
      },
    });
    const jason= await response.json();
    setNotes(jason)
  }
  // Add a new note function
  const addNote = async(Title, Description) => {
    // feching to API to do
    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("token"),
      },
      body: JSON.stringify({Title,Description}),
    });
    let jason=await response.json()
    // getAllNotes()//refreshing all the notes when a new note has been added in the database
    setNotes(Notes.concat(jason))
  };
  // delete a new note function
  const deleteNote = async(id) => {
    console.log("Note has been delerted with id:"+id)
    // feching to API to do
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("token"),
      },
    });
    const jason= await response.json();
    // getAllNotes()// updating all the notes when a note has been delete in the database
    setNotes(Notes.filter((note)=>{return note._id!==id }))
    showAlert("Note has been deleted successfully","success")
  };
  // edit a existing note function
  const editNote = async(id,Title,Description) => {

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("token"),
      },
      body: JSON.stringify({Title,Description}),
    });
    const jason= await response.json();
    let NewNotes=JSON.parse(JSON.stringify(Notes))
    for(let i=0;i<NewNotes.length;i++)
      {
        const element=NewNotes[i]
        if(element._id==id)
        {
          NewNotes[i].Title=Title;
          NewNotes[i].Description=Description
          break;
        }
      }
      setNotes(NewNotes)
  };
  return (
    <>
      <noteContext.Provider value={{ Notes, setNotes,addNote,deleteNote,editNote,getAllNotes}}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}></Home>} />
              <Route exact path="/About" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </noteContext.Provider>
    </>
  );
}

export default App;
