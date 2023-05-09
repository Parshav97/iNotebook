import React from 'react'
// import noteContext from "../context/notes/noteContext"
// import AddNote from './AddNote'
import Notes from './Notes'

const Home = (props) => {

    return (
        <div>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
