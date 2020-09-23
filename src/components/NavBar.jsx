import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = (props) => (
  <Navbar bg="light">
    <Navbar.Brand href="/">Deepbench</Navbar.Brand>
    <Nav className="mr-auto">
      <LinkContainer to="/">
        <Nav.Item className="mr-2">Home</Nav.Item>
      </LinkContainer>
      <LinkContainer to="/models">
        <Nav.Item className="mr-2">Models</Nav.Item>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default NavBar;
