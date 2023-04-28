import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Form from "./form";
import Header from "./Header";
import LogoutButton from "./logout";
import StatusPanel from "./StatusPanel";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [moodVal, setMoodVal] = useState(0);
  const [isVis, setVis] = useState(false);
  const [markedDates, setMarkedDates] = useState(new Map());
  const [userInfo, setUserInfo] = useState([]);

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
  }

  // function to pass into form component to add date and vals to markedDates and update database 
  const onClick = () => {
    setVis(false);
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
    console.log("isVis value changed to:", isVis);
  }, [moodVal, isVis]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Header />
        <div style={{ display: "flex", background: "white" }}>
          <Calendar tileClassName={titleClassName} onChange={setDate} value={date} onClickDay={onDateSelect} />
          {userInfo &&<StatusPanel markedDates={markedDates} setUserInfo = {setUserInfo} userInfo = {userInfo} user={user} isVis={isVis} day={date.toDateString()} onClick={onClick} handleMoodValChange={setMoodVal} />}
        </div>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;
