import * as React from 'react';
import {  Container } from 'react-bootstrap';
import { FaTwitter, FaInstagram,FaGithub,FaLinkedinIn,FaTelegram } from "react-icons/fa";

const Footer = () => {

return(

    <div className="bg-secondary mt-auto">
  <Container className="p-2">
  <section className="mb-4">
      <a className="btn  btn-floating m-1" target="_blank"  rel="noopener noreferrer" href="https://t.me/HoseinMontazer" role="button">

      <FaTelegram size={35}/>
      </a>

      <a className="btn  btn-floating m-1"target="_blank" rel="noopener noreferrer"  href="https://twitter.com/hoseinmontazerr" role="button">
        <FaTwitter size={35}/>
      </a>

      <a className="btn  btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/huseinmontazer/" role="button">
        <FaInstagram size={35}/>
      </a>

      <a className="btn  btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/hosein-montazer-b0776369/" role="button">
        <FaLinkedinIn size={35}/>
      </a>

      <a className="btn  btn-floating m-1"  target="_blank" rel="noopener noreferrer"   href="https://github.com/hoseinmontazer" role="button">
        <FaGithub size={35}/></a> 
    </section>
    <div>
        © 2020 Copyright: 
        <a className="text-white" href="https://shirpala.ir/"> shirpala.ir</a>
    </div>
    
  </Container>
</div>
)
  };
  
  export default Footer;