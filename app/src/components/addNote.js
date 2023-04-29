import {useState} from 'react'

const AddNote = ({setAddButtonVis,userInfo,setUserInfo,setNote,setNoteCollection,setFormVis,note,date,user})=>{
    const[charCount,setCharCount]=useState(0);
    
    const handleNoteChangeDescription = (event) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
        console.log(note);
        setCharCount(value.length);
      };
      const handleNoteChangeValue = (event) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
        console.log(note);
      };
      
      
      const onSubmit = () => {
        const today = new Date();
        let minutes = today.getMinutes();
        if(minutes<10){
          minutes = "0"+minutes;
        }
        const time = today.getHours() + ":" + minutes;
        const updateNote = { description: note.description, val: note.val, time: time };
        setUserInfo((prevState) => ({
          ...prevState,
          calendarMap: {
            ...prevState.calendarMap,
            [date]: {
              ...prevState.calendarMap[date],
              noteCollection: [
                ...(prevState.calendarMap[date]?.noteCollection ?? []),
                updateNote,
              ],
            },
          },
        }));
        
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: date, note: updateNote })
        };
        fetch(`http://localhost:8000/${user.email}/notes`, requestOptions);
        setFormVis(false);
        setAddButtonVis(true);
      };
      
      
    return (
        <div style={{display:"flex",flexDirection:"column",width:"400px"}}>
            <textarea style={{height:"200px",marginTop:"10px"}}name="description" placeholder="whats on your mind?" defaultValue={""} maxLength="300" onChange ={handleNoteChangeDescription}></textarea>
            <span>{300-charCount} characters remaining</span>
            <input type="number" min="1" max="10" step="1"name ="val" placeholder="rate how you are feeling right now on a scale of 1 to 10" onChange ={handleNoteChangeValue}></input>
            <div>
            <button style={{marginTop:"10px", marginRight:"10px"}}className="button-13" onClick={onSubmit}>Submit</button>
            <button style={{marginTop:"10px"}}className="button-13" onClick={()=>{setFormVis(false);setAddButtonVis(true)}}>cancel</button>
            </div>
          
        </div>
     
    )
}

export default AddNote;