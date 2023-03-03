import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import '../static/toolbar.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPencilSquare, BsCalendarPlus,FaGithub,FaLinkedinIn,FaTelegram } from "react-icons/bs";


function InsertEvent(props) {
  //const [date, setDate] = useState(new Date());
  const location = useLocation();
  const data = location;
  console.log("bbbbss",data);
  
  // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // let monthIndex = (data.state.month);
  // let monthName = monthNames[monthIndex];

 
 return (
 <div>


      <Container fluid >
        <Row>
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'blue' }}> */}
          <Col xs={12} xl={12} >
            <div className={'toolbar'}>
            <a className="btn  btn-floating m-1"t arget="_blank" rel="noopener noreferrer"  href="https://twitter.com/hoseinmontazerr" role="button">
                <BsPencilSquare color="#FFF4F1" size={35}/>
            </a>
            <a className="btn  btn-floating m-1"t arget="_blank" rel="noopener noreferrer"  href="https://twitter.com/hoseinmontazerr" role="button">
                <BsCalendarPlus color="#FFF4F1" size={35}/>
            </a>
            </div>
          </Col>
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'red' }}> */}
          <Col xs={12} xl={12}    >
            <div className={'detial-event'}>
            <p >
              {/* <span>Default selected date:</span>{data.state.id.toDateString()} */}
              {/* <span>Default selected date:</span>{data.state()} */}
              </p>
              <div >
                {data.state.month}
              </div>
              <div >
                {data.state.day}
              </div>
              <div >
                {data.state.fulldate}
              </div>
            </div>
          </Col>
        </Row>
      </Container>







 </div>

  )
}

export default InsertEvent;