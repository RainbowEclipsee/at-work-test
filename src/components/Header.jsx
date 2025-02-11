import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">User Management</h1>
      <nav className="header-nav">
        <Link to="/">Главная</Link>
      </nav>
    </header>
  );
};

export default Header;
