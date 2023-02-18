import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";


function InsertEvent(props) {
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const data = location;
  console.log(data);
  
 
 return (
 <div>
  InsertEvent
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

  )
}

export default InsertEvent;