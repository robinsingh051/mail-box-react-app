import React from "react";
import { Nav, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideNavBar = (props) => {
  const unreadMails = useSelector((state) => state.email.unreadMails);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const activeLinkStyle = {
    color: "black",
    fontWeight: "bold",
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
          InBox{" "}
          {unreadMails > 0 && (
            <Badge bg="info" pill>
              {unreadMails}
            </Badge>
          )}
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
