import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import Calendar from 'react-calendar';


function InsertEvent(props) {
  //const [date, setDate] = useState(new Date());
  const location = useLocation();
  const data = location;
  console.log("bbbbss",data);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (data.state.id.getMonth());
  let monthName = monthNames[monthIndex];

 
 return (
 <div>
  InsertEvent
  <span>Default selected date:</span> {data.state.id.toString()}
  <div>
  {data.state.id.getFullYear()}
  </div>
  <div>
  {data.state.id.getMonth()}
  </div>
  <div>
  {data.state.id.getDate()}
  </div>
  <div>
       {monthName}
  </div>

 </div>

  )
}

export default InsertEvent;