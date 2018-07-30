import React from 'react';
import { Button, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import Link from 'gatsby-link';
import SideNavSubMenu from '../sideNavSubMenu';
import './_.sideNav.scss';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, active: 0, forReact: false};
  }

  toggle(id) {
    this.setState({ 
      active: this.state.active = id
    });
  }

  render() {
    let componentItems;
    let layoutItems;

    if (!this.state.forReact && this.props.links && this.props.links.component) {
      componentItems = this.props.links.component.map((navItem) => {
        const { path, text, className } = navItem;
        const isFullPage = path.endsWith('-full/');
        if (isFullPage) {
          return null;
        }
        return (
          <NavItem key={`navigation-${path}`}>
            <Link className="nav-link" activeClassName="nav-active" to={`/docs${path}`}>{text}</Link>
          </NavItem>
        );
      });
    }

    if (!this.state.forReact && this.props.links && this.props.links.layout) {
      layoutItems = this.props.links.layout.map((navItem) => {
        const { path, text, className } = navItem;
        const isFullPage = path.endsWith('-full/');
        if (isFullPage) {
          return null;
        }
        return (
          <NavItem key={`navigation-${path}`}>
            <Link className="nav-link" activeClassName="nav-active" to={`/docs${path}`}>{text}</Link>
          </NavItem>
        );
      });
    }

    return (
      <Nav vertical className="sidebar">
        <NavItem onClick={this.toggle.bind(this, 0)} className="nav-link" to="/docs/foundations/">
          <Button color="link">Foundations</Button>
        </NavItem>
        <NavItem onClick={this.toggle.bind(this, 1)} className="nav-link" to="/docs/layouts/">
          <Button color="link">Layouts</Button>
          <Collapse isOpen={this.state.active === 1} className="sub-menu">
            {layoutItems}
          </Collapse>
        </NavItem>
        <NavItem onClick={this.toggle.bind(this, 2)} className="nav-link" to="/docs/components/">
          <Button color="link">Components</Button>
          <Collapse isOpen={this.state.active === 2} className="sub-menu">
            {componentItems}
          </Collapse>
        </NavItem>
      </Nav>
    )
  }
}

SideNav.defaultProps = {
  forReact: false
};

export default SideNav;
