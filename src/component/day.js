import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import axiosBaseURL from '../httpCommon';
import jwt_decode from "jwt-decode";
import Login from "../pages/Login";
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
  //Math.floor(new Date('2012.08.10').getTime() / 1000)
  const [stopDate, setStoptDate] = useState(new Date());

  const [showInsert, setShowInsert] = useState(false);
  const [summery, setSummery] = useState("");


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
      console.log("mmmmmmmmmmmo --->",date.state.month)
      let month = parseInt(date.state.month)+1
      console.log("mmmnnnnnnnnnno --->", month)
      setLoad(true);
      try {
        let pubDate= date.state.fulldate+"-"+month+"-"+date.state.day
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

  // check token is valid
  if (localStorage.getItem('access-token') !== null) {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    //console.log(`token is ${accessToken}`);
    //console.log(`token is avalible1`);
  
    try {
      if (jwt_decode(accessToken).exp < Date.now() / 1000) {
        //console.log(`token is expired`);
        localStorage.clear();
        return <Login />;
      }else{
        //console.log('token is valid2');
        //return <Home />;
        //localStorage.clear();
        //getCharacters();



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


	const saveData = (event) => {
    
    let summery= event.currentTarget.getAttribute("summery")
    let startdate= event.currentTarget.getAttribute("startdate")
    let stopdate= event.currentTarget.getAttribute("stopdate")
    let timeStampStartDate = Math.floor(new Date(startdate).getTime() / 1000)
    let timeStampSoptDate = Math.floor(new Date(stopdate).getTime() / 1000)
    //console.log("summery ----> " , summery,"start date ----> ",startdate," stop date ----> " ,stopdate, "time stamp start ----> " , timeStampStartDate , " time stop stop ----> " , timeStampSoptDate)
    console.log(JSON.parse(localStorage.getItem('access-token')))
    const fetchData = async () =>{
      setLoad(true);
      try {
        //console.log("pubDate----> ",pubDate)
        console.log("summery ----> " , summery,"start date ----> ",startdate," stop date ----> " ,stopdate, "time stamp start ----> " , timeStampStartDate , " time stop stop ----> " , timeStampSoptDate)

        const {data: response} = await axiosBaseURL.post('api/event/create/', {},{
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'EventSummery' : summery,
            'StartTime': timeStampStartDate,
            'EndTime' : timeStampSoptDate
          }

        })


        setData(response);
        setError(true)
        console.log("showevent",response)
      } catch (err) {
        setError(false)
        //console.error(error.message);
      }
      setLoad(false);
    }
    fetchData();
    console.log("asas",event)

	};

  const editData = (event) => {
    console.log("not avalable")

  };


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

      <ul className="list-group">
        {/* <span>Default selected date:</span>{date.toDateString()} */}
        {data.map(item => {
          return (
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div className="flex-column">
                    <p  className="fw-bold">summery: {item.summery_event}</p>
                    <div class="ms-3">
                    <p  className="list-group-item-text">start: {item.start_time}</p>
                    <p  className="list-group-item-text">end: {item.end_time}</p>
                    </div>
                  </div>

          <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                <BsPencilSquare color="black"  size={20}/>
            </a>
            <span class="badge rounded-pill badge-success">Active</span>

          </li>
          

          
          )
        })}
      </ul>
      )

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
                <Modal.Title>insert event</Modal.Title>
              </Modal.Header>
              <Modal.Body>inser new event
                  <MDBInput   wrapperClass='mb-4' label='summery' type='text'  value={summery} onChange={(e) => setSummery(e.target.value)} />
                  <span>start date</span>
                  <DatePicker  showIcon  timeInputLabel="Time:" dateFormat="yyyy/MM/dd h:mm aa" showTimeInput selected={startDate} onChange={(startdate) => setStartDate(startdate)} />
                  <span>stop date</span>
                  <DatePicker showIcon   timeInputLabel="Time:" dateFormat="yyyy/MM/dd h:mm aa" showTimeInput selected={stopDate} onChange={(stopdate) => setStoptDate(stopdate)}   />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseIsert}>
                  Close
                </Button>
                <Button variant="primary"   summery={summery} startdate={startDate} stopdate={stopDate} onClick={saveData}>
                  Save event
                </Button>
              </Modal.Footer>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Modalaaaaaaaaaa heading</Modal.Title>

              </Modal.Header>
              <Modal.Body>
                <MDBInput wrapperClass='mb-4' label='Summery' id='form1' type='text'/>
                <div>
                  <DatePicker  showIcon  timeInputLabel="Time:" dateFormat="yyyy/MM/dd h:mm aa" showTimeInput selected={startDate} onChange={(startdate) => setStartDate(startdate)} />
                </div>
                <div>
                  <DatePicker showIcon   timeInputLabel="Time:" dateFormat="yyyy/MM/dd h:mm aa" showTimeInput selected={stopDate} onChange={(stopdate) => setStoptDate(stopdate)}   />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary"  summery="hiiii" startdate={startDate} stopdate={stopDate} onClick={editData}>
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