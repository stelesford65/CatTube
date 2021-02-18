import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink , Link} from "react-router-dom";
import "../css/NavBar.css";
import logo from "../images/Cat_Only2.png";

function NavBar(props) {
  // Show login/register links
  let buttons = (
    <Nav className="ml-auto">
      <NavLink
        as={Link}
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/login"
      >
        Log In
      </NavLink>
      <NavLink
        as={Link}
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/register"
      >
        Sign Up
      </NavLink>
    </Nav>
  );

  if (props.user.id) {
    // Show username/logout
    buttons = (
      <Nav className="ml-auto">
        <NavDropdown title={props.user.name} alignRight id="user-dropdown">
          <NavDropdown.Item as={Link} to="/" onClick={() => props.setUser({})}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} style={{ width: 50, height: 50, marginTop: -7 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavLink
            as={Link}
            className="navbar__link"
            activeClassName="navbar__link--active"
            to="/videos"
          >
            Videos
          </NavLink>
        </Nav>
        {buttons}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
