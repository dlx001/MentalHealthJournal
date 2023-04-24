import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Calendar from 'react-calendar'
import { useState,useEffect } from "react";
import Form from "./form";
import LogoutButton from "./logout";
import Header from "./Header";
import StatusPanel from "./StatusPanel";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [date,setDate] = useState(new Date());
  const[moodVal,setMoodVal] = useState(0);
  const [isVis, setVis] = useState(false);
  const [markedDates, setMarkedDates] = useState(new Map());
  const [userInfo,setUserInfo]=useState([]);
  
  //function to create highlights on calendarMap 
  const titleClassName = ({date})=>{
      const val = markedDates.get(date.toDateString());
      let classname = 'val'+val;
     return classname;
  }

  //upon validation, load user data from database 
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch(`http://localhost:8000/${user.email}`);
      const userData = await response.json();
      setUserInfo(userData);
      const map = new Map(Object.entries(userData.calendarMap));
      setMarkedDates(map);
    }
    fetchData();
  },[isAuthenticated]);
  //console.log(userInfo);
  //function to be used in form component to set moodvals
  const handleMoodValChange=(val)=>{
    setMoodVal(val);
    //console.log(moodVal);
  }

  //toggle visibility of form on date select
  let onDateSelect =(dateValue)=>{
    const today = new Date();
    setDate(dateValue);
    const selectedDate = new Date(dateValue);
    if(selectedDate<=today){
      setVis(true);
    }else{
      setVis(false);
    }  
  }

  //function to pass into form component to add date and vals to markedDates and update database 
  let onClick =()=>{
    setVis(false);
    if(moodVal>0&&moodVal<=10){
      const newMap = new Map([...markedDates,[date.toDateString(),moodVal]]);
      setMarkedDates(newMap);
      const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date:`${date.toDateString()}`,value: `${moodVal}`})
    };
    fetch(`http://localhost:8000/${user.email}`,requestOptions);
    }
    setMoodVal(0);
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
        <Header></Header>
        <div style={{display:"flex",   background: "white"}}>
        <Calendar tileClassName={titleClassName} onChange={setDate} value={date} onClickDay={onDateSelect} ></Calendar>
        <StatusPanel></StatusPanel>
          </div>
       
      </div>
    )
  );
};

export default Profile;