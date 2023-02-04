import React from "react";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import { Next } from "react-bootstrap/esm/PageItem";




const Home = () => {
  if (localStorage.getItem('access-token') !== null) {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    //console.log(`token is ${accessToken}`);
    console.log(`token is avalible-Home`);
  
    try {
      if (jwt_decode(accessToken).exp < Date.now() / 1000) {
        console.log(`token is expired-Home`);
        return <Login />;
        localStorage.clear();
      }else{
        console.log('token is valid-Home');
        //return <Home />;
        //localStorage.clear();
      } 
      } catch (e) {
        return <Login />;
        localStorage.clear();
        console.log(e)
      }
      
  
    
  } else {
    console.log(`token not found`);
  }

    return <h1>Home</h1>;
  };
  
  export default Home;