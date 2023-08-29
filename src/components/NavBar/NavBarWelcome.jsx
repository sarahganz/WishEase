import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBarWelcome({ user, setUser }) {
  const logoPath = "/logoPurpleBackgr.png";

  return (
    <nav className="navbar">
      <div>
        <Link className="navbar-brand" to="/">
          <img src={logoPath} alt="Logo" className="logo-image2" />
        </Link>
      </div>
      <div className="navbar-nav">
        <NavLink className="nav-link" to="/about" activeClassName="active">
          ABOUT
        </NavLink>
      </div>
    </nav>
  );
}
