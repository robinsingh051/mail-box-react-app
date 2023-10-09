import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { BsEnvelope } from "react-icons/bs"; // Import the Gmail icon from react-icons

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = () => {
    history.push("/login");
  };

  const registerHandler = () => {
    history.push("/register");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Navbar.Brand style={{ marginLeft: "1rem" }}>
        <BsEnvelope className="me-2" /> Mailbox
      </Navbar.Brand>
      <Container>
        <Nav className="me-auto" variant="dark"></Nav>
        {isLoggedIn && (
          <Button variant="outline-light" onClick={logoutHandler}>
            Log Out
          </Button>
        )}
        {!isLoggedIn && (
          <Button
            variant="outline-light"
            onClick={registerHandler}
            style={{ marginRight: 6 }}
          >
            Register
          </Button>
        )}
        {!isLoggedIn && (
          <Button variant="outline-light" onClick={loginHandler}>
            Log In
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
