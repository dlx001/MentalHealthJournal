import { useState } from "react";

const Form = (props)=>{
    const handleChange = (event)=>{
    props.handleMoodValChange(event.target.value);
    }
    const date = new Date(props.day);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    return(<div style={{width:'400px',display:"flex",flexDirection:"column"}}>
        <h2 style={{fontFamily:"garamond"}}>How was {dateString} on a scale of 1 to 10</h2>
        <input style={{width:"400px!important"}}type="number" min="1" max="10" step="1"name ="val" placeholder="rate how you were feeling on a scale of 1 to 10" onChange ={handleChange}></input>
        <div style={{display:"flex"}}>
        <button style={{marginTop:"10px", marginRight:"10px"}}className="button-13" onClick={props.onClick}>Submit Mood</button>
        <button style={{marginTop:"10px", marginRight:"10px"}}className="button-13" onClick={()=>props.setMoodValFormVis(false)}>Cancel</button>
        </div>
  
    </div>)
}
export default Form;