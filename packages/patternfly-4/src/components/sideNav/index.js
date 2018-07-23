import React from 'react';
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import Link from 'gatsby-link';
import SideNavSubMenu from '../sideNavSubMenu';
import './_.sideNav.scss';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, active: 0};
  }

  toggle(id) {
    this.setState({ 
      active: this.state.active = id
    });
  }

  render() {
    let componentItems;
    let layoutItems;

    if (this.props.links && this.props.links.component) {
      componentItems = this.props.links.component.map((navItem) => {
        const { path, text, className } = navItem;
        const isFullPage = path.endsWith('-full/');
        if (isFullPage) {
          return null;
        }
        return (
          <NavItem>
            <Link className="nav-link" activeClassName="nav-active" to={path}>{text}</Link>
          </NavItem>
        );
      });
    }

    if (this.props.links && this.props.links.layout) {
      layoutItems = this.props.links.layout.map((navItem) => {
        const { path, text, className } = navItem;
        const isFullPage = path.endsWith('-full/');
        if (isFullPage) {
          return null;
        }
        return (
          <NavItem>
            <Link className="nav-link" activeClassName="nav-active" to={path}>{text}</Link>
          </NavItem>
        );
      });
    }

    return (
      <Nav vertical className="sidebar">
        <NavItem>
          <Link onClick={this.toggle.bind(this, 0)} className="nav-link" activeClassName="nav-active" to="/docs/foundations/">Foundations</Link>
        </NavItem>
        <NavItem>
          <Link onClick={this.toggle.bind(this, 1)} className="nav-link" activeClassName="nav-active" to="/docs/layouts/">Layouts</Link>
          <Collapse isOpen={this.state.active === 1} className="sub-menu">
            {layoutItems}
          </Collapse>
        </NavItem>
        <NavItem>
          <Link onClick={this.toggle.bind(this, 2)} className="nav-link" activeClassName="nav-active" to="/docs/components/button/">Components</Link>
          <Collapse isOpen={this.state.active === 2} className="sub-menu">
            {componentItems}
          </Collapse>
        </NavItem>
      </Nav>
    )
  }
}

export default SideNav;
