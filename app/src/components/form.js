import { useState } from "react";

const Form = (props)=>{
    const handleChange = (event)=>{
    props.handleMoodValChange(event.target.value);
    }
    return(<div style={{width:'500px'}}>
        <h1>Rate {props.day} on a scale of 1 to 10</h1>
        <input type="text" defaultValue={0} onChange ={handleChange}></input>
        <button onClick={props.onClick}> Click Me</button>
    </div>)
}
export default Form;