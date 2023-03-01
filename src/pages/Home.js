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

  const [load, setLoad] = useState(true);
  const [data, setData] = useState([])




  useEffect(() => {
    const fetchData = async () =>{
      setLoad(true);
      try {
        const {data: response} = await axiosBaseURL.get('api/event/', {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('access-token'))}`
          }

        })
        setData(response);
        console.log(response)
      } catch (error) {
        console.error(error.message);
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
    }, 1000);
  }, []);

  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const dayPage = (strdate) => {
    navigate('/day',{
      state: {
        id: strdate,
      },
    });

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








  return (
    <div>
    {loading ? (
      <GroovyWalk />
    ) : (
    <div  className={'app-parent'}>





      <Container fluid >
        <Row>
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'blue' }}> */}
          <Col xs={12} xl={8} >
            <Calendar className={'app'} onChange={setDate} value={date} onClickDay={dayPage} />
          </Col>
          {/* <Col xs={12} xl={6} style={{ backgroundColor: 'red' }}> */}
          <Col xs={12} xl={4}    >
            <div className={'flex-detail'}>
            <p >
              <span>Default selected date:</span>{date.toDateString()}  
              </p>
              <div >
              {data.map(item => (<span key={item} >{item.start_time}</span>))}
              </div>
              <div >
              {data.map(item => (<span key={item} >{item.end_time}</span>))}
              </div>
              <div >
              {data.map(item  => (<span key={item} >{item.summery_event}</span>))}
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