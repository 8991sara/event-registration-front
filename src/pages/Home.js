import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import GroovyWalk from "../component/groovyWalk";
import axiosBaseURL from '../httpCommon';
import '../static/calender.css';
import Login from "./Login";





const Home = () => {


  const [date, setDate] = useState(new Date());
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () =>{
      setLoad(true);
      try {
        let pubDate= date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
        //console.log("pubDate----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
          }

        })
        setData(response);
        setError(true)
        //console.log("aaaaaaa",response)
      } catch (err) {
        setError(false)
        //console.error("bbbbbbbbbbbbbb",err.message);
      }
      setLoad(false);
    }

    fetchData();
  }, []);


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);


	const clickHandler = (event) => {
		if(event.detail === 2){
          navigate('/day',{
            state: {
              month: event.currentTarget.getAttribute("getMonth"),
              day: event.currentTarget.getAttribute("getDay"),
              fulldate: event.currentTarget.getAttribute("fullDate"),
              datetostring: event.currentTarget.getAttribute("dateToString"),
            },
          });

		}
	}

  const showEvenetDetails = event => {
    //console.log("month -------->" ,date.getMonth()+1 )
    let month = date.getMonth()+1
    //setDate()
    const fetchData = async () =>{
      setLoad(true);
      try {
        let pubDate= date.getFullYear()+"-"+month+"-"+date.getDate()
        //console.log("pubDate----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
          }

        })
        setData(response);
        setError(true)
        //console.log("showevent",response)
      } catch (err) {
        setError(false)
        //console.error(error.message);
      }
      setLoad(false);
    }
    fetchData();
    //console.log("asas",event)
  };




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
      <Container fluid  style={{padding: '10px 10px 10px 10px'}} >
        <Row>
      <ul>
      <Col  >
      <div cla>
        <h1> {date.toDateString()} </h1>
      </div>

      </Col>
      <Col  >
        {data.map(item => {
          return (
          <div className="list-group-day">
          <div >
            <p className="summary">{item.summery_event}</p>
          </div>
          <div className="date">
            <p>Start: {item.start_time.split('T')[0]} {item.start_time.split('T')[1].split('Z')[0]}</p>
          </div>     
          <div className="date">
            <p>Stop: {item.end_time.split('T')[0]} {item.end_time.split('T')[1].split('Z')[0]}</p>
          </div> 
          </div>
          )
        })}
        </Col>
      </ul>
      </Row>
      </Container>
      )
  }


  return (
    <div>
    {loading ? (
      <GroovyWalk />
    ) : (
    <div  className={'app-parent'}>

      <Container fluid >
        <Row>
          <Col xs={12} xl={8} >
            <div  dateToString={date.toDateString()} getMonth={date.getMonth()} getDay={date.getDate()} fullDate={date.getFullYear()}   onClick={clickHandler}>
            <Calendar className={'app'}   onChange={setDate} value={date} onClickDay={showEvenetDetails}
            tileContent={
              ({ activeStartDate, date, view }) => {
                // return view === 'month' && date.getDay() === 0
                // ? <p onMouseEnter={
                //     //do whatever you want
                //     console.log('hi')
                //     }>Sunday</p> 
                // : null
                return
                switch(view) {
                  case "0":
                    <p>2</p>
                    break;
                  case "1":
                    <p>2</p>
                    break;
                  case "2":
                    <p>2</p>
                    break;
                  default:
                    <p>2</p>
              }
              }
              
            }
          
            />
            </div>
          </Col>
          <Col xs={12} xl={4}  >
            <div className={'flex-detail'}>
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
    
    )}
    </div>
  );
  
};
  
  export default Home;