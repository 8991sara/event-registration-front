import React , { useState } from 'react';
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const Layout = () => {

  const [isLoggedin, setIsLoggedin] = useState(false);

  if (localStorage.getItem('access-token') !== null) {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    //console.log(`token is ${accessToken}`);
    console.log(`token is avalible-Layout`);
  
    try {
      if (jwt_decode(accessToken).exp < Date.now() / 1000) {
        console.log(`token is expired-Layout`);
      }else{
        console.log('token is valid-Layout');
        setIsLoggedin(true);
      } 
      } catch (e) {
        console.log(e)
      }
      
  
    
  } else {
    console.log(`token not found`);
  }


  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Event</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/Contact">Contact</Nav.Link>
            <Nav.Link href="/Login" >
            Login
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Outlet />
      
    </>
  )
};

export default Layout;
