import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Form from "./form";
import Header from "./Header";
import LogoutButton from "./logout";
import StatusPanel from "./StatusPanel";
import DropDown from "./dropDown";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [moodVal, setMoodVal] = useState(0);
  const [isVis, setVis] = useState(false);
  const [markedDates, setMarkedDates] = useState(new Map());
  const [userInfo, setUserInfo] = useState([]);
  const [dropDownVis,setDropDownVis]=useState(false);
  const [moodValFormVis,setMoodValFormVis]=useState(true);
  const fakeData = [
    {
      time: '08:00',
      description: 'Started the day with a 10-minute meditation. Feeling focused and centered.',
      mood: '7'
    },
    {
      time: '10:00',
      description: 'Went for a morning jog in the park. Feeling energized and refreshed.',
      mood: '8'
    },
    {
      time: '14:30',
      description: 'Had a productive meeting with my team. Feeling accomplished.',
      mood: '9'
    },
    {
      time: '18:00',
      description: 'Feeling a little overwhelmed with work. Took a break and went for a walk.',
      mood: '6'
    },
    {
      time: '20:00',
      description: 'Attended a yoga class. Feeling relaxed and peaceful.',
      mood: '8'
    },
    {
      time: '22:00',
      description: 'Relaxed with a good book before bed. Feeling calm and content.',
      mood: '7'
    }
  ];
  const addFakeData=()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: `${new Date().toDateString()}`, fakeData: `${fakeData}` })
    };
    fetch(`http://localhost:8000/${user.email}/fakeData`, requestOptions);
    console.log('testing fake add');
  }
  addFakeData();
  
  // function to create highlights on calendarMap 
  const titleClassName = ({ date }) => {
    const obj = markedDates.get(date.toDateString());
    let className = '';
    if (obj !== undefined) {
      const value = obj.value;
      className = "val"+value;
    }
    //console.log(className);
    return className;
  };

  // upon validation, load user data from database 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/${user.email}`);
      const userData = await response.json();
      setUserInfo(userData);
      const map = new Map(Object.entries(userData.calendarMap));
      setMarkedDates(map);
    }
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // toggle visibility of form on date select
  const onDateSelect = (dateValue) => {
    const today = new Date();
    setDate(dateValue);
    const selectedDate = new Date(dateValue);
    if (selectedDate <= today) {
      setVis(true);
    } else {
      setVis(false);
    }
    /*

    if(markedDates.get(dateValue.toDateString())&&markedDates.get(dateValue.toDateString()).value&&markedDates.get(dateValue.toDateString()).value>0){
      setMoodValFormVis(false);
    }else{
      setMoodValFormVis(true);
    }
    */
  }

  // function to pass into form component to add date and vals to markedDates and update database 
  const onClick = () => {
    setMoodValFormVis(false);
    if (moodVal > 0 && moodVal <= 10) {
      const newMap = new Map([...markedDates, [date.toDateString(), { value: moodVal }]]);
      setMarkedDates(newMap);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: `${date.toDateString()}`, value: `${moodVal}` })
      };
      fetch(`http://localhost:8000/${user.email}`, requestOptions);
    }
    setMoodVal(0);
  };
  

  useEffect(() => {
    console.log("Mood value changed to:", moodVal);
  }, [moodVal, isVis]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        <Header dropDownVis = {dropDownVis} setDropDownVis={setDropDownVis} />
        <div style={{ display: "flex", background: "white" }}>
          <Calendar tileClassName={titleClassName} onChange={setDate} value={date} onClickDay={onDateSelect} />
          {dropDownVis&&<DropDown></DropDown>}
          {userInfo &&<StatusPanel markedDates={markedDates} setMoodValFormVis={setMoodValFormVis} moodValFormVis={moodValFormVis}
          setUserInfo = {setUserInfo} userInfo = {userInfo} user={user} isVis={isVis} day={date.toDateString()} onClick={onClick} 
          handleMoodValChange={setMoodVal} />}
        </div>
      </div>
  );
};

export default Profile;
