import React, { useRef } from 'react'
import { useContext, useEffect,useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import Notesitem from './Notesitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

function NotesCard(props) {
  let History=useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token"))
      {
        getAllNotes();
      }
    else{
      History("/login")
    }
  }, []);
  const { Notes, getAllNotes } = useContext(noteContext)
  const {addNote,editNote}=useContext(noteContext)
  const [cNote,ucNote]=useState({eTitle:"",eDescription:""})
  const updateNotes = (currentnote) => {
    ref.current.click()
    ucNote({id:currentnote._id,eTitle:currentnote.Title,eDescription:currentnote.Description})
  }
  const onChange=(e)=>
    {
        ucNote({...cNote,[e.target.name] : e.target.value})
    }
const handleOnClick=(e)=>
    {
        ref.current.click()
        editNote(cNote.id,cNote.eTitle,cNote.eDescription)
        props.showAlert("Note has been updated successfully","success")
        
    }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="eTitle" name="eTitle" value={cNote.eTitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="eDescription" name="eDescription" value={cNote.eDescription} onChange={onChange} />
                </div>
              </form>
            </div>
          <div class="modal-footer">
            <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={cNote.eTitle.length<5|| cNote.eDescription.length<5} type="button" class="btn btn-primary" onClick={handleOnClick}>Update</button>
          </div>
        </div>
      </div>
      </div>
      <AddNote showAlert={props.showAlert} />
      <div className="row my-3 mx-3">
        <h2>Your Notes</h2>
        {Notes.length==0?<div className='container'><h5>No Notes to show</h5></div>:Notes.map((Note) => {
          return <Notesitem key={Note._id} update={updateNotes} note={Note} />
        })}
      </div>
    </>
  )
}

export default NotesCard
