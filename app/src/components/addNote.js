const AddNote = ({setNote,setNoteCollection,setFormVis,note})=>{
    const handleNoteChange = (event) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
        console.log(note);
      };

      const onSubmit = () => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes()
        setNoteCollection((prevNoteCollection) => [
          ...prevNoteCollection,
          { ...note, time: time }
        ]);
        setFormVis(true);
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