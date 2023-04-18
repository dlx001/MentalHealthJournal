import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Calendar from 'react-calendar'
import { useState,useEffect } from "react";
import Form from "./form";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [date,setDate] = useState(new Date());
  const[moodVal,setMoodVal] = useState(0);
  const [isVis, setVis] = useState(false);
  const [markedDates, setMarkedDates] = useState(new Map());
  const [markDatesArr,setMarkDatesArr]=useState([]);
  console.log(user);
  const titleClassName = ({date})=>{
    const val = markedDates.get(date.toDateString());
      let classname = 'val'+val;
      console.log(classname);
     return classname;
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch(`http://localhost:8000/${user.email}`);
      const userData = await response.json();
      console.log(userData);
    }
    fetchData();
  },[isAuthenticated]);

  const handleMoodValChange=(val)=>{
    setMoodVal(val);
    console.log(moodVal);
  }
  let onDateSelect =(dateValue)=>{
    setVis(true);
    setDate(dateValue);
  }
  let onClick =()=>{
    setVis(false);
    const newMap = new Map([...markedDates,[date.toDateString(),moodVal]]);
    setMarkedDates(newMap);
    console.log(markedDates);
  }
  useEffect(() => {
    console.log("Mood value changed to:", moodVal);
    console.log("isVis value changed to:", isVis);
  }, [moodVal, isVis]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Calendar tileClassName={titleClassName} onChange={setDate} value={date} onClickDay={onDateSelect} ></Calendar>
        {isVis&&<Form onClick ={onClick} day={date.toDateString()} handleMoodValChange={handleMoodValChange}></Form>}
      </div>
    )
  );
};

export default Profile;