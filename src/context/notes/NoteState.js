import React, { useState } from "react"
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const s1 = {
  //     "name":"Harry",
  //     "class":"5b"
  // }
  // const [state, setState] = useState(s1);
  // const update = ()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Larry",
  //             "class":"10b"
  //         })
  //     }, 1000);
  // }
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

   // Get All Notes
   const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3ZmM2ODA0Yzk5NGI0NTUxMGFiMjdiIn0sImlhdCI6MTYzNTc2ODY2OH0.TLBmWDagX-zjduO247PeK1ALUoKCjII0f9a3N5Mt-m0"
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
