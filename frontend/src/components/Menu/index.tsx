import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function Menu() {
  const [isLoading, setIsloading] = useState("");
  let isLogged = false;

  try {
    isLogged = !!sessionStorage.getItem("token");
  } catch {
    isLogged = false;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {}
      <Container>
        <Navbar.Brand href="/">Nature Fitness</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/register">register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {/* {isLogged ? (
              <Nav.Link href="/">USUARIO</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/register">register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
