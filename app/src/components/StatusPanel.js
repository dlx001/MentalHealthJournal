import Form from "./form";
import Note from "./Note";
import { useState,useEffect } from "react";
import AddNote from "./addNote";

const StatusPanel = (props)=>{
    let notes=props.userInfo.calendarMap;
    const [noteCollection,setNoteCollection]=useState([]);
    const [formVis,setFormVis]=useState(false);
    const [note,setNote ]=useState([{time:"",description:"",val:""}])
    const [deleteVis,setDeleteVis]=useState(false);
    const [deleteButtonVis,setDeleteButtonVis]=useState(true);
    //console.log(noteCollection);
    useEffect(()=>{
        let day = props.day;
        let obj = props.userInfo.calendarMap
        if(obj&&obj[day]){
            notes=obj[day].noteCollection;
            //console.log(notes);
            setNoteCollection(notes);
        }else{
            setNoteCollection([]);
        }
    },[notes,props.day])
    const removeNote =(removeNote)=>{
        props.setUserInfo((prevState) => ({
            ...prevState,
            calendarMap: {
              ...prevState.calendarMap,
              [props.day]: {
                ...prevState.calendarMap[props.day],
                noteCollection: (prevState.calendarMap[props.day]?.noteCollection ?? []).filter(note => note.val!=removeNote.val||note.description != removeNote.description||note.time!=removeNote.time)
              }
            }
          }));    
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: props.day, note: removeNote})
          };
          fetch(`http://localhost:8000/${props.user.email}/notes`, requestOptions);  
         
    }
    useEffect(()=>{
        console.log(props.userInfo);
    },[props.userInfo])
   
    return( <div style={{width:"800px"}}>
        {noteCollection.map((note,i)=><Note deleteVis={deleteVis} removeNote={removeNote} setUserInfo={props.setUserInfo} date={props.day} description={note.description} val = {note.val} time={note.time} key={i}></Note>)}
        <button onClick={()=>setFormVis(true)}>add Note</button>
        {deleteButtonVis&&<button onClick={()=>{setDeleteVis(true);setDeleteButtonVis(false)}}>delete Note</button>}
        {!deleteButtonVis&&<button onClick={()=> {setDeleteVis(false);setDeleteButtonVis(true)}}>finish deleting</button>}
        {formVis&&<AddNote userInfo={props.userInfo} setUserInfo={props.setUserInfo} user={props.user} date={props.day} setFormVis = {setFormVis} note = {note} setNote={setNote} setNoteCollection={setNoteCollection}></AddNote>}
        <Form isVis={props.isVis} day = {props.day} handleMoodValChange={props.handleMoodValChange} onClick={props.onClick}></Form>
        </div>)
   
}
export default StatusPanel;