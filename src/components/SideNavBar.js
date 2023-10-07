import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideNavBar = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const activeLinkStyle = {
    color: "black", // Change this to the desired text color
  };

  return (
    <Nav className="flex-column" style={{ backgroundColor: "transparent" }}>
      {isLoggedIn && (
        <NavLink
          to="/inbox"
          className="nav-link"
          variant="primary"
          activeStyle={activeLinkStyle}
        >
          InBox
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="/sent"
          className="nav-link"
          variant="primary"
          activeStyle={activeLinkStyle}
        >
          Sent Mails
        </NavLink>
      )}
    </Nav>
  );
};

export default SideNavBar;
