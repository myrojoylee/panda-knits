import React from "react";
import PandaLogo from "../../assets/panda-knits-logo-v2.png";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    <Navigate to="/" />;
  };
  return (
    <header>
      <section className="panda-logo">
        <img className="panda-logo-img" src={PandaLogo} />
        <article className="panda-logo-text">
          <span>panda</span>
          <span>knits</span>
        </article>
      </section>
      <Nav
        className="shopping-nav"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        {Auth.loggedIn() ? (
          <>
            <Link className="nav-link" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>

            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              <span>SignIn</span>
            </Link>

            <Link className="nav-link" to="/me/shoppingcart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </>
        )}
      </Nav>
    </header>
  );
}

export default Header;
