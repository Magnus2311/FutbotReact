import * as React from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import UserNavMenu from "./Auth/UserNavMenu";

const NavMenu: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        light
      >
        <NavbarBrand tag={Link} to="/">
          FutbotReact
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={isOpen}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            <UserNavMenu />
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
