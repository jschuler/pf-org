import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@patternfly/react-styles';
// import { AngleRightIcon, AngleDownIcon } from '@patternfly/react-icons';
import AngleRightIcon from '@patternfly/react-icons/dist/js';
import AngleDownIcon from '@patternfly/react-icons/dist/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSearch, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './navigationItemGroup.styles';
// {isExpanded ? '<AngleRightIcon />' : '<AngleDownIcon />'}

const propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

class NavigationItemGroup extends React.Component {
  static currentId = 0;
  static propTypes = propTypes;

  id = NavigationItemGroup.currentId++;
  contentId = `nav-item-group-content-${this.id}`;

  render() {
    const { title, onToggleExpand, children, isExpanded } = this.props;

    return (
      <nav>
        <button
          aria-expanded={isExpanded}
          aria-controls={this.contentId}
          className={css(styles.title)}
          onClick={onToggleExpand}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '1.1rem',
              fontWeight: 700
            }}
          >
            {title} {isExpanded ? <FontAwesomeIcon icon={faAngleRight} size="1x" /> : <FontAwesomeIcon icon={faAngleDown} size="1x" />}
          </div>
        </button>
        <ul
          id={this.contentId}
          aria-hidden={!isExpanded}
          className={css(styles.items, isExpanded && styles.itemsExpanded)}
        >
          {children}
        </ul>
      </nav>
    );
  }
}

export default NavigationItemGroup;
