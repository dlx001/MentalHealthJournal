import Form from "./form";
import Note from "./Note";
import { useState,useEffect } from "react";
import AddNote from "./addNote";

const StatusPanel = (props)=>{
    let notes=props.userInfo.calendarMap;
    const [noteCollection,setNoteCollection]=useState([]);
    const [formVis,setFormVis]=useState(false);
    const [note,setNote ]=useState([{time:"",description:"",val:""}])
    console.log(noteCollection);
    useEffect(()=>{
        let day = props.day;
        let obj = props.userInfo.calendarMap
        if(obj&&obj[day]){
            notes=obj[day].noteCollection;
            console.log(notes);
            setNoteCollection(notes);
        }else{
            setNoteCollection([]);
        }
    },[notes,props.day])
    return( <div>
        {noteCollection.map((note,i)=><Note description={note.description} val = {note.val} time={note.time} key={i}></Note>)}
        <button onClick={()=>setFormVis(true)}>add Note</button>
        {formVis&&<AddNote userInfo={props.userInfo} setUserInfo={props.setUserInfo} user={props.user} date={props.day} setFormVis = {setFormVis} note = {note} setNote={setNote} setNoteCollection={setNoteCollection}></AddNote>}
        <Form isVis={props.isVis} day = {props.day} handleMoodValChange={props.handleMoodValChange} onClick={props.onClick}></Form>
        </div>)
   
}
export default StatusPanel;