import * as React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram,FaGithub,FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

return(

    <div className="bg-secondary mt-auto">
  <Container className="p-2">
  <section class="mb-4">
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">

      <FaFacebook size={30}/>
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaTwitter size={30}/>
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaInstagram size={30}/>
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaLinkedinIn size={30}/>
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaGithub size={30}/></a> 
    </section>
    <div>
        © 2020 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    
  </Container>
</div>
)
  };
  
  export default Footer;