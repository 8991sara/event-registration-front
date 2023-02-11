import React, { useState , useEffect} from "react";
import GroovyWalk from "../component/groovyWalk";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import {useNavigate} from 'react-router-dom';import InsertEvent from "../component/day";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../static/calender.css'






const Home = () => {
  const [date, setDate] = useState(new Date());


  const navigate = useNavigate();

  const dayPage = () => {
    // 👇️ navigate programmatically
    navigate('/day');
  };


  // check token is valid
  if (localStorage.getItem('access-token') !== null) {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    //console.log(`token is ${accessToken}`);
    console.log(`token is avalible1`);
  
    try {
      if (jwt_decode(accessToken).exp < Date.now() / 1000) {
        console.log(`token is expired`);
        localStorage.clear();
        return <Login />;
      }else{
        console.log('token is valid2');
        //return <Home />;
        //localStorage.clear();
      } 
      } catch (e) {
        //window.location = "/login";
        localStorage.clear();
        console.log(e)
        return <Login />;
      }    
  } else {
    console.log(`token not found`);
    return <Login />;
  }

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
    {loading ? (
      <GroovyWalk />
    ) : (
      <div className='app'>
      <h1 className='header'>React Calendar</h1>
      <div>
       <Calendar onChange={setDate} value={date} onClickDay={dayPage}/>
      </div>
   
      {date.length > 0 ? (
      <p>
        <span>Start:</span>
        {date[0].toDateString()}
        &nbsp;
        &nbsp;
        <span>End:</span>{date[1].toDateString()}
      </p>
             ) : (
      <p>
         <span>Default selected date:</span>{date.toDateString()}
        
         
      </p> 
             )
      }
   
    </div>
    
    )}
    </div>
  );
  
};
  
  export default Home;