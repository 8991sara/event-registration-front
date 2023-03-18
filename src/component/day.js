import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import axiosBaseURL from '../httpCommon';
import jwt_decode from "jwt-decode";
import Login from "../pages/Login";
import '../static/toolbar.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPencilSquare, BsCalendarPlus , BsFillTrashFill, BsShareFill} from "react-icons/bs";
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
//import {useNavigate} from 'react-router-dom';

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
  
//  const navigate = useNavigate();
















  //const [date, setDate] = useState(new Date());
  const location = useLocation();
  const date = location;
  console.log("date 11  day is ---- >",date);
  


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
      //console.log("mmmmmmmmmmmo --->",date.state.month)
      let month = parseInt(date.state.month)+1
      //console.log("mmmnnnnnnnnnno --->", month)
      setLoad(true);
      try {
        let pubDate= date.state.fulldate+"-"+month+"-"+date.state.day
        //console.log("pubDate day ----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
          }

        })
        //console.log(response)
        setData(response);
        setError(true)
        //console.log("resposnse is ----->",response)
      } catch (err) {
        setError(false)
        //console.error("bbbbbbbbbbbbbb",err.message);
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
        //console.log(e)
        return <Login />;
      }    
  } else {
    //console.log(`token not found`);
    return <Login />;
  }


	const saveData = (event) => {
    
    let summery= event.currentTarget.getAttribute("summery")
    let startdate= event.currentTarget.getAttribute("startdate")
    let stopdate= event.currentTarget.getAttribute("stopdate")
    let timeStampStartDate = Math.floor(new Date(startdate).getTime() / 1000)
    let timeStampSoptDate = Math.floor(new Date(stopdate).getTime() / 1000)
    //console.log("summery ----> " , summery,"start date ----> ",startdate," stop date ----> " ,stopdate, "time stamp start ----> " , timeStampStartDate , " time stop stop ----> " , timeStampSoptDate)
    //console.log(JSON.parse(localStorage.getItem('access-token')))
    const fetchData = async () =>{
      setLoad(true);
      try {
        //console.log("pubDate----> ",pubDate)
        //console.log("summeryy ----> " , summery.toString(),"start date ----> ",startdate," stop date ----> " ,stopdate, "time stamp start ----> " , timeStampStartDate , " time stop stop ----> " , timeStampSoptDate)

        const {data: response} = await axiosBaseURL.post('api/event/create/', {
          'EventSummery' : summery.toString() ,
          'StartTime': timeStampStartDate.toString(),
          'EndTime' : timeStampSoptDate.toString()
        },{
          headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`
          }

        })

        //console.log("response -----> ",response)
        setData(response);
        setError(true)
        //console.log("showevent",response)
        //console.log("ggggggggg ---->",  date)
        window.location.reload(false);

      } catch (err) {
        setError(false)
        // console.error("erro ----> ",error.message);
        // console.error("erro ----> ",error);
      }
      setLoad(false);
    }
    fetchData();
    //console.log("asas",event)

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

        <Container fluid style={{padding: '10px 10px 10px 10px'}} >
        <h1>
          {date.state.fulldate}/{date.state.month}/{date.state.day}
        </h1>
          <Row>
          <div >      
        <Col  >
          {data.map(item => {
            return (
            <div className="list-group-day">
            <div className="three  ">
              <h1> Summery </h1>
              <p>{item.summery_event}</p>
            </div>
            <div className="three">
              <h1> Start Date </h1>
              <p>{item.start_time}</p>
            </div>     
            <div className="three">
              <h1> Stop Date </h1>
              <p>{item.end_time}</p>
            </div>
            <a className="btnd"  rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                 <BsPencilSquare color="black"  size={20}/>
            </a>

            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                 <BsFillTrashFill color="black"  size={20}/>
            </a>
            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                 <BsShareFill color="black"  size={20}/>
            </a>
            </div>
            )
          })}
          </Col>
        </div>
        </Row>
        </Container>
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
            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShowEdit} role="button">
                 <BsShareFill color="white"  size={30}/>
            </a>


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
            <div className="list-day">
            {/* <div> */}
              <div>
                  
                      {  error ?
                        getListItems() : getErrorView()
                      }
                    
                    
              </div>
              </div>
          </Col>
        </Row>
      </Container>







 </div>
  )
}

export default InsertEvent;