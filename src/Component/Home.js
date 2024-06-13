import React from 'react'
import NotesCard from './NotesCard'

function Home(props) {
  
  return (
    <>
    <NotesCard showAlert={props.showAlert}/>
    </>
  )
}

export default Home
