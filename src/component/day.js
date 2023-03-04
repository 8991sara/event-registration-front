import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import axiosBaseURL from '../httpCommon';
import '../static/toolbar.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPencilSquare, BsCalendarPlus,FaGithub,FaLinkedinIn,FaTelegram } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function InsertEvent(props) {


  const [load, setLoad] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(false)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  



  //const [date, setDate] = useState(new Date());
  const location = useLocation();
  const date = location;
  console.log("date day is ---- >",date);
  





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

            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShow} role="button">
                <BsCalendarPlus color="#FFF4F1" size={30}/>
            </a>
            <a className="btnd" target="_blank" rel="noopener noreferrer"  onClick={handleShow} role="button">
                <BsPencilSquare color="#FFF4F1"  size={30}/>
            </a>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
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