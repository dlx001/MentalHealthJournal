
const Note = (props)=>{

    return(<div>
        <h1>{props.time}</h1>
        <p>{props.description}</p>
        <h2> Mood level: {props.val}</h2>
        <button onClick={()=>props.removeNote(props)}>x</button>
    </div>)
}
export default Note;