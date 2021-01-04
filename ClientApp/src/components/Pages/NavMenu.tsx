import * as React from "react";
import {
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import UserNavMenu from "./Auth/UserNavMenu";

const NavMenu: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEaAccountsOpen, setIsEaAccountsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleEaAccounts = () => setIsEaAccountsOpen(!isEaAccountsOpen);

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        light
      >
        <Container>
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
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>
              <UserNavMenu />
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
