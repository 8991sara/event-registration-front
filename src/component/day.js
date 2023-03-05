import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import axiosBaseURL from '../httpCommon';
import '../static/toolbar.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPencilSquare, BsCalendarPlus } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {
  MDBInput,
}
from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function InsertEvent(props) {


  const [load, setLoad] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [stoptDate, setStoptDate] = useState(new Date());

  const [showInsert, setShowInsert] = useState(false);
  

  const handleCloseIsert = () => setShowInsert(false);
  const handleShowInsert = () => setShowInsert(true);

  const handleCloseEdit= () => setShowEdit(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  



  //const [date, setDate] = useState(new Date());
  const location = useLocation();
  const date = location;
  console.log("date day is ---- >",date);
  


  const renderInsertTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      insert
    </Tooltip>
  );
  


  const renderEditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      edit
    </Tooltip>
  );


  useEffect(() => {
    const fetchData = async () =>{
      setLoad(true);
      try {
        let pubDate= date.state.fulldate+"-"+date.state.month+"-"+date.state.day
        console.log("pubDate day ----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
          }

        })
        console.log(response)
        setData(response);
        setError(true)
        console.log("resposnse is ----->",response)
      } catch (err) {
        setError(false)
        console.error("bbbbbbbbbbbbbb",err.message);
      }
      setLoad(false);
    }

    fetchData();
  }, []);



	const saveData = (event) => {
      console.log("Double Clicked")

	}


  const getErrorView = () => {
    return (
      <div>
        Oh no! Something went wrong. 
        <p style={{ color: "red" }}>{data.message}</p>
        <p style={{ color: "red" }}>Try again</p>
      </div>
    )
  }

  const getListItems = () => {


    return(

      <ul>
        {/* <span>Default selected date:</span>{date.toDateString()} */}
        {data.map(item => {
          return (
          <li>
          <p  className="list-group-item-text">summery: {item.summery_event}</p>
          <p  className="list-group-item-text">start: {item.start_time}</p>
          <p  className="list-group-item-text">end: {item.end_time}</p>
          <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowInsert} role="button">
                <BsCalendarPlus color="black" size={20}/>
          </a>
          <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                <BsPencilSquare color="black"  size={20}/>
            </a>
          </li>
          
          )
        })}
      </ul>
      )

    // return(
    //   <h1>hiiiiiiiiii</h1>
    //   //<p  className="list-group-item-text">summery: {data._event}</p>
    // )
  }



 return (

 <div>


      <Container fluid >
        <Row>
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'blue' }}> */}
          <Col xs={12} xl={12} >
            <div className={'toolbar'}>
              <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderInsertTooltip}
              >   
            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowInsert} role="button">
                <BsCalendarPlus color="#FFF4F1" size={30}/>
            </a>
            </OverlayTrigger>
 




            <Modal show={showInsert} onHide={handleCloseIsert}>
              <Modal.Header closeButton>
                <Modal.Title>pppppppppppp</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!
                  <MDBInput   wrapperClass='mb-4' label='Email address' id='form1' type='email'  />
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseIsert}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveData}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Modalaaaaaaaaaa heading</Modal.Title>

              </Modal.Header>
              <Modal.Body>
                <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <DatePicker selected={startDate} onChange={(date) => setStoptDate(date)}   />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveData}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            </div>
          </Col>



          
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'red' }}> */}
          <Col xs={12} xl={12}    >
            <div className={'detial-event'}>
            <p >
              {/* <span>Default selected date:</span>{data.state.id.toDateString()} */}
              {/* <span>Default selected date:</span>{data.state()} */}
              </p>
              <div>
                    <ul>
                      {  error ?
                        getListItems() : getErrorView()
                      }
                    </ul>
                    
              </div>
              </div>
          </Col>
        </Row>
      </Container>







 </div>
  )
}

export default InsertEvent;