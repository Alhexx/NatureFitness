import Router from "next/router";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import api from "../../services/api";
import { LogOut } from "../Logout";

export function Menu() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  let isLogged = false;

  const getRole = async () => {
    try {
      setIsLoading(true);
      const resRole = await api.get(
        "/users/" + sessionStorage.getItem("token")
      );
      console.log(resRole.data.roles[0]);
      setRole(resRole.data.roles[0]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Nature Fitness</Navbar.Brand>
        {isLoading ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="/register">register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                {role === "ADMIN" ? (
                  <>
                    <Nav.Link href="/admin">Admin Page</Nav.Link>
                    <LogOut />
                  </>
                ) : role === "TRAINER" ? (
                  <>
                    <Nav.Link href="/trainer">Trainer Page</Nav.Link>
                    <LogOut />
                  </>
                ) : role === "CLIENT" ? (
                  <>
                    <Nav.Link href="/client">Client Page</Nav.Link>
                    <LogOut />
                  </>
                ) : (
                  <>
                    <Nav.Link href="/register">register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
