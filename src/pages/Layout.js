import React  from 'react';
import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const Layout = () => {




  return (
    <>
    <Navbar  bg="light" variant="light" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="/">Event</Navbar.Brand>
        <Navbar.Toggle style={{ 
            backgroundImage: "url(" + "https://www.nicesnippets.com/image/imgpsh_fullsize.png" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll" >
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
