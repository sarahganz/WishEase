import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const logoPath = "/logoPurpleBackgr.png";

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        <img src={logoPath} alt="Logo" className="logo-image" />
      </Link>
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/wishlist"
                activeClassName="active"
              >
                WISHLIST
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/achieved-wishes"
                activeClassName="active"
              >
                ACHIEVED WISHES
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogOut}>
                LOG OUT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
