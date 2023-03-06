import React  from 'react';
import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import menuToggle from "../static/img/icons8-circled-menu-50.png"
import logo from "../static/img/logo-bk.svg"

const Layout = () => {




  return (
    <>
    <Navbar  bg="light" variant="light" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="/" >
              <img
                src={logo}
                width="90"
                height="50"
              />
        </Navbar.Brand>
        <Navbar.Toggle style={{ 
            backgroundImage: `url(${menuToggle})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
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
