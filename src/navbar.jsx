import React from "react";
import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import "./navbar.css"
import kid from './assets/kid.png';
import { Link } from "react-router-dom";
export default function NavbarComponent() {
  return (
<Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top" dir="rtl">

    <Navbar.Brand as={Link} to="/pages/home"><img
    src={kid}
    alt="MyApp Logo"
    height="40"      
    className="d-inline-block align-top"
  />
  </Navbar.Brand >
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
            <Nav.Link as={Link} to="/pages/home">الرئيسية</Nav.Link>
            <Nav.Link as={Link} to="/pages/activities">أنشطة</Nav.Link>
            <Nav.Link as={Link} to="/pages/about">حولنا</Nav.Link>
        </Nav>
        </Navbar.Collapse>

</Navbar>
   
  );}