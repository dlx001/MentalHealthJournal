const AddNote = ({userInfo,setUserInfo,setNote,setNoteCollection,setFormVis,note,date,user})=>{
    const handleNoteChange = (event) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
        console.log(note);
      };
      
      const onSubmit = () => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        const updateNote = { description: note.description, val: note.val, time: time };
        setUserInfo((prevState) => ({
          ...prevState,
          calendarMap: {
            ...prevState.calendarMap,
            [date]: {
              ...prevState.calendarMap[date],
              noteCollection: [...prevState.calendarMap[date].noteCollection, updateNote]
            }
          }
        }));
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: date, note: updateNote })
        };
        fetch(`http://localhost:8000/${user.email}/notes`, requestOptions);
        setFormVis(false);
      };
      
      
    return (
        <div>
            <input type="text" name="description" defaultValue={""} onChange ={handleNoteChange}></input>
            <input type="text" name ="val" defaultValue={0} onChange ={handleNoteChange}></input>
            <button onClick={onSubmit}>Submit</button>
        </div>
     
    )
}

export default AddNote;