import React from 'react';
import { css } from '@patternfly/react-styles';
import styles from './navigation.styles';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import NavigationItemGroup from './navigationItemGroup';
import NavigationItem from './navigationItem';
import ValueToggle from '../valueToggle';

const routeShape = PropTypes.shape({
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
});

const propTypes = {
  routes: PropTypes.array,
  componentRoutes: PropTypes.arrayOf(routeShape),
  layoutRoutes: PropTypes.arrayOf(routeShape)
};

const defaultProps = {
  routes: [],
  componentRoutes: [],
  layoutRoutes: []
};

class Navigation extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  state = {
    searchValue: ''
  };

  handleSearchChange = e => {
    const searchValue = e.target.value;
    this.setState(() => ({
      searchValue
    }));
  };

  render() {
    const { routes, componentRoutes, layoutRoutes } = this.props;
    const { searchValue } = this.state;
    const searchRE = new RegExp(searchValue, 'i');

    const filteredComponentRoutes = componentRoutes.filter(c => searchRE.test(c.label));

    const filteredLayoutRoutes = layoutRoutes.filter(c => searchRE.test(c.label));

    // Start Edit
    const allRoutes = routes.map((routeParent, index) => {
      const { title, children } = routeParent;
      const routeChildren = children.map((route, index) => (
        <NavigationItem to={route.to} key={route.to}>
          {route.label}
        </NavigationItem>
      ));
      return (
        <ValueToggle key={title}>
          {({ value, toggle }) => (
          <NavigationItemGroup 
            title={title}
            isExpanded={value}
            onToggleExpand={toggle}
          >
            {routeChildren}
          </NavigationItemGroup>
          )}
        </ValueToggle>
      );
    });
    return (
      <div className={css(styles.navigation)}>
        <div className={css(styles.navigationContent)}>
          {/* <div className={css(styles.search)}>
            <input
              className={css(styles.input)}
              placeholder="Find components, templates,..."
              type="text"
              value={searchValue}
              onChange={this.handleSearchChange}
            />
          </div> */}
          {allRoutes}
          <ValueToggle>
            {({ value, toggle }) => (
            <NavigationItemGroup 
              title="Developer API"
              isExpanded={value}
              onToggleExpand={toggle}
            >
              <NavigationItem to="/docs/apis/">
                React API
              </NavigationItem>
            </NavigationItemGroup>
            )}
          </ValueToggle>
        </div>
      </div>
    );
    // End Edit

    return (
      <div className={css(styles.navigation)}>
        <div className={css(styles.navigationContent)}>
          <div className={css(styles.logo)}>
            <Link to="/">
              <img src={logo} alt="PatternFly Logo" />
            </Link>
          </div>
          <div className={css(styles.search)}>
            <input
              className={css(styles.input)}
              placeholder="Find components, templates,..."
              type="text"
              value={searchValue}
              onChange={this.handleSearchChange}
            />
          </div>
          <NavigationItemGroup title="Style">
            <NavigationItem to="/styles/tokens">Tokens</NavigationItem>
            <NavigationItem to="/styles/icons">Icons</NavigationItem>
          </NavigationItemGroup>
          {Boolean(filteredComponentRoutes.length) && (
            <NavigationItemGroup title="Components">
              {filteredComponentRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
          {Boolean(filteredLayoutRoutes.length) && (
            <NavigationItemGroup title="Layouts">
              {filteredLayoutRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;
