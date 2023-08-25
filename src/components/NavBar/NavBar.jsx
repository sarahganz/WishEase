import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css"; // Import your custom CSS for additional styling

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const logoPath = "/logoPurpleBackgr.png";

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img src={logoPath} alt="Logo" className="logo-image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-nav ml-auto d-flex align-items-center">
          <NavLink className="nav-link" to="/" exact activeClassName="active">
            HOME
          </NavLink>
          <NavLink className="nav-link" to="/wishlist" activeClassName="active">
            WISHLIST
          </NavLink>
          <NavLink
            className="nav-link"
            to="/achieved-wishes"
            activeClassName="active"
          >
            ACHIEVED WISHES
          </NavLink>
          <Link className="nav-link" to="#" onClick={handleLogOut}>
            LOG OUT
          </Link>
          {/* <span className="navbar-text">{user.name}</span> */}
        </div>
      </div>
    </nav>
  );
}
