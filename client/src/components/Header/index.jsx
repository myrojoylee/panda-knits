import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/me">{Auth.getProfile().data.username}'s profile</Link>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/about">About Panda Knits</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
