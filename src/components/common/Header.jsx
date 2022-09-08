import React from "react";
import logo from "../../logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <FontAwesomeIcon icon={faBars} />
      <Link to="/">
        <img className="logo-img" alt="logo" src={logo} />
      </Link>
      <FontAwesomeIcon icon={faCartShopping} />
    </div>
  );
};

export default Header;
