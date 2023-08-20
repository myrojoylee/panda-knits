import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    <Navigate to="/" />;
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-wrapper">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto" defaultActiveKey="/">
          {Auth.loggedIn() ? (
            <>
              <Link className="nav-link active" to="/">
                Home
              </Link>

              <Link className="nav-link" to="/myOrders">
                {Auth.getProfile().data.username}'s profile
              </Link>

              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/">
                Home
              </Link>

              {/* <Link className="nav-link" to="/login">
                Login
              </Link> */}

              <Link className="nav-link" to="/signup">
                Sign In
              </Link>

              <Link className="nav-link" to="/about">
                Our Story
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
