import React from 'react'
import { useContext,useState } from 'react'
import noteContext from '../Context/notes/noteContext'

function AddNote(props) {
    const {addNote}=useContext(noteContext)
    const [cNote,ucNote]=useState({ Title:"",Description:""})
    const onChange=(e)=>
        {
            ucNote({...cNote,[e.target.name] : e.target.value})
        }
    const handleOnClick=(e)=>
        {
            e.preventDefault();
            addNote(cNote.Title,cNote.Description)
            ucNote({ Title:"",Description:""})
            props.showAlert("Note has been successfully Added","success")
        }
  return (
    <div className='container my-3'>
    <h2>Create a New Note</h2>
    <form>
      <div className="mb-3 my-3">
        <label htmlFor="Title" className="form-label">Title</label>
        <input type="text" className="form-control" id="Title" value={cNote.Title} name="Title" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">Description</label>
        <input type="text" className="form-control" id="Description" value={cNote.Description} name="Description" onChange={onChange}/>
      </div>
      <button disabled={cNote.Title.length<5|| cNote.Description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Create Note</button>
    </form>
    </div>
  )
}

export default AddNote
