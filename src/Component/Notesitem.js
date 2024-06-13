import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

function Notesitem(props) {
    const {deleteNote,getAllNotes}=useContext(noteContext)
    const {note,update}=props
    return (
        <div>
            <div className='my-3'>
            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{note.Title}</h5>
                        <p class="card-text">{note.Description}</p>
                        <i class="fa-solid fa-trash my-3 mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                        <i class="fa-solid fa-pencil my-3 mx-3" onClick={()=>{update(note)}}></i>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Notesitem
