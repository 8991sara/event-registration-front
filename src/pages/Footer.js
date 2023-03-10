import * as React from 'react';
import {  Container } from 'react-bootstrap';
import { FaTwitter, FaInstagram,FaGithub,FaLinkedinIn,FaTelegram } from "react-icons/fa";

const Footer = () => {

return(

    <div className="mt-auto" style={{backgroundColor: '#444E3D'}}>
  <Container className="p-2">
  <section className="mb-4">
      <a className="btn shadow-none  btn-floating m-1"   target="_blank"  rel="noopener noreferrer" href="https://t.me/HoseinMontazer" role="button">

      <FaTelegram  color='white' size={35}/>
      </a>

      <a className="btn  shadow-none btn-floating m-1"target="_blank" rel="noopener noreferrer"  href="https://twitter.com/hoseinmontazerr" role="button">
        <FaTwitter color='white' size={35}/>
      </a>

      <a className="btn shadow-none btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/huseinmontazer/" role="button">
        <FaInstagram  color='white' size={35}/>
      </a>

      <a className="btn shadow-none btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/hosein-montazer-b0776369/" role="button">
        <FaLinkedinIn  color='white' size={35}/>
      </a>

      <a className="btn  shadow-none btn-floating m-1"  target="_blank" rel="noopener noreferrer"   href="https://github.com/hoseinmontazer" role="button">
        <FaGithub color='white' size={35}/></a> 
    </section>
    <div style={{color: 'white'}}>
      <span style={{fontSize:14}}> © 2020 Copyright:</span>  
       <a className="text-white fw-bold" href="https://shirpala.ir/">  shirpala.ir</a>
    </div>
    
  </Container>
</div>
)
  };
  
  export default Footer;