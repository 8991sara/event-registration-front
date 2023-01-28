import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <>
    
    <Navbar bg="navbar navbar-expand-sm bg-dark navbar-dark" collapseOnSelect expand="sm">
    <Container>
        <Navbar.Brand href="/">ER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/Contact">Contact</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;
