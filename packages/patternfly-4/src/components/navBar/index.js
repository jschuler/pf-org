import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Link from 'gatsby-link';
import './_.main-nav.scss';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      active: 0
    };
  }

  setActive(id) {
    this.setState({
      active: id
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand">PatternFly</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/get_started/">Get Started</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/docs/foundations/">Documentation</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/demos/">Demos</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/contribute/">Contribute</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/blog/">Blog</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  PatternFly 4
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/">
                    PatternFly 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}