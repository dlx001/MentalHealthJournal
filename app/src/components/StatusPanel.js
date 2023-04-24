import Form from "./form";
import Note from "./Note";
import { useState } from "react";
import AddNote from "./addNote";

const StatusPanel = (props)=>{
    const [noteCollection,setNoteCollection]=useState([{time:"8:00",description:"this is a test note",val: 5}]);
    const [formVis,setFormVis]=useState(false);
    const [note,setNote]=useState([{time:"",description:"",val:""}])
    console.log(noteCollection);
   
    //setNoteCollection(props.user.notes);
    return( <div>
        {noteCollection.map(note=><Note description={note.description} val = {note.val} time={note.time} ></Note>)}
        <button onClick={()=>setFormVis(true)}>add Note</button>
        {formVis&&<AddNote setFormVis = {setFormVis} note = {note} setNote={setNote} setNoteCollection={setNoteCollection}></AddNote>}
        </div>)
   
}
export default StatusPanel;