import {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Note = (props)=>{
    const { user, isAuthenticated, isLoading } = useAuth0(); 
    const [noteCollection,setNoteCollection]=useState([]);
    const createNoteForm = ()=>{
        return  (<input type="text" defaultValue={"enter note here"} onChange ={handleChange}></input>)

    }
    return(<button onClick={createNoteForm()}>create new note</button>);

}
export default Note;