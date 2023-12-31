import React, { useState } from "react";
import PandaLogo from "../../assets/panda-knits-logo-v2.png";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Nav, Modal, Tab } from "react-bootstrap";
import Cart from "../Cart";
import CategoryNav from "../CategoryNav";

import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    <Navigate to="/" />;
  };
  return (
    <header>
      <section className="header-top">
        <section>
          <Link className="panda-logo" to="/">
            <img className="panda-logo-img" src={PandaLogo} />
            <article className="panda-logo-text">
              <span>panda</span>
              <span>knits</span>
            </article>
          </Link>
        </section>
        <section className="header-nav-icons">
          {Auth.loggedIn() ? (
            <>
              <div>
                <Link className="sign-in-icon-wrapper" to="/myOrders">
                  <span role="img" aria-label="signup">
                    <FontAwesomeIcon icon={faUser} className="sign-in-icon" />
                  </span>
                </Link>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="shopping-cart-stationary"
                />
              </div>
              <Link className="logout" onClick={logout}>
                Log Out
              </Link>
            </>
          ) : (
            <>
              <div>
                <Link
                  className="sign-in-icon-wrapper"
                  onClick={() => setShowModal(true)}
                >
                  <span role="img" aria-label="signup">
                    <FontAwesomeIcon icon={faUser} className="sign-in-icon" />
                  </span>
                </Link>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="shopping-cart-stationary"
                />
              </div>
            </>
          )}
          {/* <FontAwesomeIcon
            icon={faCartShopping}
            className="shopping-cart-stationary"
          /> */}
          <Cart />
        </section>
      </section>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <CategoryNav />
    </header>
  );
}

export default Header;
