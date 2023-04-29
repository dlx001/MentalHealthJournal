import { useState, useEffect } from 'react';

const Note = (props) => {
  const [fullTextShown, setFullTextShown] = useState(false);
  const [text, setText] = useState(props.description);

  useEffect(() => {
    if (props.description.length > 100) {
      setText(props.description.slice(0, 100) + '... ');
    } else {
      setText(props.description);
    }
    setFullTextShown(false);
  }, [props.description]);

  const seeMoreClick = () => {
    setFullTextShown(true);
  };

  const seeLessClick = () => {
    setFullTextShown(false);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <p>{props.time}</p>
      <p style={{width:"300px",wordBreak: "break-all"}}>{fullTextShown ? props.description : text}
      {!fullTextShown && text.length > 100 && (
        <button style={{background:"none",border:"none",padding:"0",textDecoration:"underline",cursor:"pointer"}} onClick={seeMoreClick}>See more</button>
      )}
       {fullTextShown && (
        <button onClick={seeLessClick} style={{background:"none",border:"none",padding:"0",textDecoration:"underline",cursor:"pointer"}} >See less</button>
      )}
      </p>
      <p> Mood level: {props.val}</p>
      {props.deleteVis && (
        <button style={{ height: '20px', width: '20px',marginTop:"15px",textAlign:"center" }} onClick={() => props.removeNote(props)}>x</button>
      )}
    </div>
  );
};

export default Note;
