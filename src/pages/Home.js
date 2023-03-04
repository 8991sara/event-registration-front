import React, { useState , useEffect} from "react";
import GroovyWalk from "../component/groovyWalk";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import {useNavigate} from 'react-router-dom';import InsertEvent from "../component/day";
import Calendar from 'react-calendar';
import axiosBaseURL from '../httpCommon';
import '../static/calender.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





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
        console.log("pubDate----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
          }

        })
        setData(response);
        setError(true)
        console.log("aaaaaaa",response)
      } catch (err) {
        setError(false)
        console.error("bbbbbbbbbbbbbb",err.message);
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
		if(event.detail == 2){
      //console.log("Double Clicked")
      //console.log(event.currentTarget.getAttribute("data-value"));
      //console.log("pppppppppppppppppp",event)
      // const navigate = useNavigate();
          navigate('/day',{
            state: {
              month: event.currentTarget.getAttribute("getMonth"),
              day: event.currentTarget.getAttribute("getDay"),
              fulldate: event.currentTarget.getAttribute("fullDate"),
            },
          });

		}
	}

  const showEvenetDetails = event => {
    //setDate()
    const fetchData = async () =>{
      setLoad(true);
      try {
        let pubDate= date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
        console.log("pubDate----> ",pubDate)
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`,
            'pubDate': pubDate
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

      <ul>
        <span>Default selected date:</span>{date.toDateString()}
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
            <div  getMonth={date.getMonth()} getDay={date.getDate()} fullDate={date.getFullYear()}   onClick={clickHandler}>
            <Calendar className={'app'}    onChange={setDate} value={date} onClickDay={showEvenetDetails}/>
            </div>
          </Col>
          <Col xs={12} xl={4}  >
            <div className={'flex-detail'}>
            <p >
              {/* <span>Default selected date:</span>{date.toDateString()} */}
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
    
    )}
    </div>
  );
  
};
  
  export default Home;