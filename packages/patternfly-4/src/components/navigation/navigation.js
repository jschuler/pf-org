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
  nested: PropTypes.bool,
  componentRoutes: PropTypes.arrayOf(routeShape),
  layoutRoutes: PropTypes.arrayOf(routeShape)
};

const defaultProps = {
  routes: [],
  nested: true,
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
    const { routes, componentRoutes, layoutRoutes, nested } = this.props;
    const { searchValue } = this.state;
    const searchRE = new RegExp(searchValue, 'i');

    const filteredComponentRoutes = componentRoutes.filter(c =>
      searchRE.test(c.label)
    );

    const filteredLayoutRoutes = layoutRoutes.filter(c =>
      searchRE.test(c.label)
    );

    if (!nested) {
      const routeChildren = routes.map((route, index) => {
        const { label, to } = route;
        return (
          <NavigationItem key={`${route.label}-${index}`} to={route.to}>
            {route.label}
          </NavigationItem>
        );
      });
      return (
        <div>
          {routeChildren}
        </div>
        // <ValueToggle defaultValue>
        //   {({ value, toggle }) => (
        //     <NavigationItemGroup
        //       isExpanded={value}
        //       onToggleExpand={toggle}
        //       title={title}
        //     >
        //       {routeChildren}
        //     </NavigationItemGroup>
        //   )}
        // </ValueToggle>
      );
    } else {
      const allRoutes = routes.map((routeParent, index) => {
        const { title, children } = routeParent;
        const routeChildren = children.map((route, index) => (
          <NavigationItem key={`${title}-${route.label}-${index}`} to={route.to}>
            {route.label}
          </NavigationItem>
        ));
        return (
          <ValueToggle defaultValue key={`${routeParent.title}`}>
            {({ value, toggle }) => (
              <NavigationItemGroup
                isExpanded={value}
                onToggleExpand={toggle}
                title={title}
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
            {/* <ValueToggle defaultValue>
              {({ value, toggle }) => (
                <NavigationItemGroup
                  isExpanded={value}
                  onToggleExpand={toggle}
                  title="Style"
                >
                  <NavigationItem to="/styles/tokens">Tokens</NavigationItem>
                  <NavigationItem to="/styles/icons">Icons</NavigationItem>
                </NavigationItemGroup>
              )}
            </ValueToggle> */}
            {allRoutes}
          </div>
        </div>
      );
    }

  }
}

export default Navigation;
