import React from 'react';
import { Button, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import './sideNav.scss';

const routeShape = PropTypes.shape({
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
});

const propTypes = {
  routes: PropTypes.arrayOf(routeShape)
};

const defaultProps = {
  routes: []
};

class SideNav extends React.Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
  }

  render() {
    const { routes } = this.props;

    const navItems = routes.map((navItem) => {
      const { label, to } = navItem;
      return (
        <NavItem key={`navigation-${to}`}>
          <Link className="nav-link" activeClassName="nav-active" to={to}>{label}</Link>
        </NavItem>
      );
    });

    return (
      <Nav vertical className="sidebar">
        {navItems}
      </Nav>
    )
  }
}

SideNav.propTypes = {
  routes: PropTypes.array
};

SideNav.defaultProps = {
  routes: []
};

export default SideNav;
