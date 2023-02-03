import * as React from 'react';
import {  Container } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram,FaGithub,FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

return(

    <div className="bg-secondary mt-auto">
  <Container className="p-2">
  <section class="mb-4">
      <a class="btn  btn-floating m-1" href="#!" role="button">

      <FaFacebook size={35}/>
      </a>

      <a class="btn  btn-floating m-1" href="#!" role="button">
        <FaTwitter size={35}/>
      </a>

      <a class="btn  btn-floating m-1" href="#!" role="button">
        <FaInstagram size={35}/>
      </a>

      <a class="btn  btn-floating m-1" href="#!" role="button">
        <FaLinkedinIn size={35}/>
      </a>

      <a class="btn  btn-floating m-1" href="#!" role="button">
        <FaGithub size={35}/></a> 
    </section>
    <div>
        © 2020 Copyright: 
        <a class="text-white" href="https://shirpala.ir/"> shirpala.ir</a>
    </div>
    
  </Container>
</div>
)
  };
  
  export default Footer;