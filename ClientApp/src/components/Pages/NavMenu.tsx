import * as React from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./NavMenu.css";
import UserNavMenu from "./Auth/UserNavMenu";
import { ReactComponent as AdminIcon } from "../../images/admin/management.svg";

const NavMenu: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  const handleAdminIconClick = () => {
    history.push("/admin/roles/index");
  };

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
        <AdminIcon
          onClick={handleAdminIconClick}
          className="admin-icon"
          style={{
            height: "30px",
            width: "30px",
            fill: "white",
            cursor: "pointer",
          }}
        />
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
