import React from 'react';
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import './_.sideNavSubMenu.scss';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <Nav vertical className="sidebar">
        <NavItem>
          <NavLink href="#" onClick={this.toggle}>Foundations</NavLink>
          <Collapse isOpen={this.state.collapse}>
            <NavItem>
              <NavLink href="#">Sub link</NavLink>
            </NavItem>
          </Collapse>
        </NavItem>
        <NavItem>
          <NavLink href="#">Layouts</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Components</NavLink>
        </NavItem>
      </Nav>
    )
  }
}

export default SideNav;