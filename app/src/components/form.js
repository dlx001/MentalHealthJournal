import { useState } from "react";

const Form = (props)=>{
    const handleChange = (event)=>{
    props.handleMoodValChange(event.target.value);
    }

    return(props.isVis &&<div style={{width:'500px',padding: "7% 12% 5% 5%"}}>
        <h1 style={{fontFamily:"garamond"}}>How was {props.day} on a scale of 1 to 10</h1>
        <input type="text" defaultValue={0} onChange ={handleChange}></input>
        <button onClick={props.onClick}> Click Me</button>
    </div>)
}
export default Form;