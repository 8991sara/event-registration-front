import * as React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram,FaGithub,FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

return(

    <div className="bg-secondary mt-auto">
  <Container className="p-2">
  <section class="mb-4">
      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">

      <FaFacebook />
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaTwitter />
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
      <FaTwitter />
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaInstagram />
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaLinkedinIn />
      </a>

      <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
        <FaGithub /></a> 
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